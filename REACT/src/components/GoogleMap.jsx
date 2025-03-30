import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import parse from "autosuggest-highlight/parse";
import { debounce } from "@mui/material/utils";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../slices/buildingSlice";

const GOOGLE_MAPS_API_KEY = "AIzaSyBNVjEXhyDOUvcCECJFY5x_OGKt38dxVBk";

function loadScript(src, position, id) {
  if (!position) {
    return;
  }

  // אם הסקריפט כבר קיים, לא צריך לטעון שוב
  if (document.getElementById(id)) {
    return;
  }

  const script = document.createElement("script");
  script.setAttribute("async", ""); // טעינה אסינכרונית
  script.setAttribute("defer", ""); // דחיית הריצה עד לטעינת ה-HTML
  script.setAttribute("id", id);
  script.src = `${src}&loading=async`; // הוספת הפרמטר loading=async
  position.appendChild(script);
}

const autocompleteService = { current: null };

export default function GoogleMaps({ setBuilding, setIsExist }) {
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState("");
  const [options, setOptions] = React.useState([]);
  const loaded = React.useRef(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (typeof window !== "undefined" && !loaded.current) {
    if (!document.querySelector("#google-maps")) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`,
        document.querySelector("head"),
        "google-maps"
      );
    }
    loaded.current = true;
  }

  const fetch = React.useMemo(
    () =>
      debounce((request, callback) => {
        autocompleteService.current.getPlacePredictions(request, callback);
      }, 400),
    []
  );

  React.useEffect(() => {
    let active = true;

    if (!autocompleteService.current && window.google) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results) => {
      if (active) {
        let newOptions = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  const handleSelect = (event, newValue) => {
    setValue(newValue);
    setBuilding({ address: newValue?.description || "" });
    checkAddress(newValue?.description || ""); // הפעל את הפונקציה אחרי הבחירה
  };

  const checkAddress = async (selectedAddress) => {
    setIsExist(false);
    if (selectedAddress !== "") {
      try {
        const response = await dispatch(login({ address: selectedAddress }));
        if (login.fulfilled.match(response)) {
          navigate("/signUp", { state: { status: 200 } });
        } else if (login.rejected.match(response)) {
          const error = response.payload;
          if (error.status === 404) {
            setIsExist(false);
          } else {
            console.log("connection error: ", error);
          }
        }
      } catch (error) {
        console.log("unexpected error: ", error);
      }
    }
  };

  return (
    <Autocomplete
      id="google-map-demo"
      sx={{
        width: "100%",
        margin: "1rem 0",
        "& .MuiInputBase-root": {
          borderRadius: "10px",
          backgroundColor: "#f9f9f9",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        },
        "& .MuiOutlinedInput-notchedOutline": {
          border: "1px solid #ddd",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "#aaa",
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "#6200ea",
          borderWidth: "2px",
        },

        "& .MuiOutlinedInput-root": {
          "&.Mui-focused fieldset": {
            borderColor: "#a1e5c9",
          },
        },
      }}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.description
      }
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      noOptionsText="No locations"
      onChange={handleSelect} // האירוע של הבחירה
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={
            <span
              style={{
                color: "#a1e5c9",
              }}
            >
              Search Address
            </span>
          }
          variant="outlined"
          fullWidth
        />
      )}
      renderOption={(props, option) => {
        const matches =
          option.structured_formatting.main_text_matched_substrings || [];

        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match) => [match.offset, match.offset + match.length])
        );

        // Extract the key directly from the props
        const { key, ...restProps } = props;

        return (
          // העברת ה-key ישירות ל-li
          <li key={key} {...restProps} style={{ padding: "10px 15px" }}>
            <Grid container alignItems="center">
              <Grid item sx={{ display: "flex", width: 44 }}>
                <LocationOnIcon sx={{ color: "#a1e5c9" }} />
              </Grid>
              <Grid item sx={{ width: "calc(100% - 44px)", wordWrap: "break-word" }}>
                {parts.map((part, index) => (
                  <Box
                    key={index}
                    component="span"
                    sx={{ fontWeight: part.highlight ? "bold" : "regular" }}
                  >
                    {part.text}
                  </Box>
                ))}
                <Typography variant="body2" color="text.secondary">
                  {option.structured_formatting.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
}
