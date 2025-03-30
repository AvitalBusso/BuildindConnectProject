package com.example.demo.controller;

import com.example.demo.model.Building;
import com.example.demo.model.Users;
import com.example.demo.service.BuildingRepository;
import com.example.demo.service.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/buildings")
public class BuildingController {

    @Autowired
    private BuildingRepository buildingRepository;
    @Autowired
    private UsersRepository usersRepository;

    @PostMapping("/addBuilding")
    public ResponseEntity<Building> addBuilding(@RequestBody Building building) {
        Building existingBuilding = buildingRepository.findByAddress(building.getAddress());

        if (existingBuilding == null) {
            Building savedBuilding = buildingRepository.save(building);
            return new ResponseEntity<>(savedBuilding, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(existingBuilding, HttpStatus.CONFLICT);
    }

    @PostMapping("/login")
    public ResponseEntity<Building> logIn(@RequestBody Building b) {
        System.out.println(b);
        Building existingBuilding = buildingRepository.findByAddress(b.getAddress());
        if (existingBuilding == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // 404
        }
        return new ResponseEntity<>(existingBuilding, HttpStatus.OK); // 200
    }

    @GetMapping("/getById/{id}")
    public ResponseEntity<Building> getBuildingById(@PathVariable Long id) {
        Building building = buildingRepository.findById(id).orElse(null);
        if (building == null)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(building, HttpStatus.OK);
    }

    @GetMapping("/getTenantList/{BuildingId}")
    public ResponseEntity<List<Users>> getTenantList(@PathVariable Long BuildingId) {
        List<Users> tenents = usersRepository.findByBuildingId(BuildingId);
        return new ResponseEntity<>(tenents, HttpStatus.OK);
    }

//    @PostMapping("/existBuilding")
//    public ResponseEntity<Building> existBuilding(@RequestBody Building b) {
//        Building existingBuilding = buildingRepository.findByAddress(b.getAddress());
//        if (existingBuilding == null) {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // 404
//        }
//        return new ResponseEntity<>(existingBuilding, HttpStatus.OK); //200
//    }

//    @GetMapping("/getAll")
//    public ResponseEntity<List<Building>> getAllBuildings() {
//        return new ResponseEntity<>(buildingRepository.findAll(), HttpStatus.OK);
//    }

//    @PutMapping("/update/{id}")
//    public ResponseEntity<Building> updateBuilding(@PathVariable Long id, @RequestBody Building building) {
//        Building b1 = buildingRepository.findById(id).orElse(null);
//        if (b1 == null)
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        b1.setAddress(building.getAddress());
//        b1.setMonthPrice(building.getMonthPrice());
//        buildingRepository.save(b1);
//        return new ResponseEntity<>(b1, HttpStatus.OK);
//    }

//    @DeleteMapping("/delete/{id}")
//    public ResponseEntity<Void> deleteBuilding(@PathVariable Long id) {
//        Building building = buildingRepository.findById(id).orElse(null);
//        if (building == null)
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        buildingRepository.delete(building);
//        return new ResponseEntity<>(HttpStatus.OK);
//    }
}

