package com.example.demo.controller;

import com.example.demo.model.Ad;
import com.example.demo.model.Users;
import com.example.demo.service.AdRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/api/ads")
public class AdController {

    @Autowired
    private AdRepository adRepository;

    @PostMapping("/addAd")
    public ResponseEntity<Ad> addAd(@RequestBody Ad ad) {
        Ad savedAd = adRepository.save(ad);
        return new ResponseEntity<>(savedAd, HttpStatus.CREATED); //201
    }

    @GetMapping("/getByBuildingId/{id}")
    public ResponseEntity<List<Ad>> getByBuildingId(@PathVariable Long id) {
        List<Ad> buildingAds = adRepository.findByBuildingId(id);
        if (buildingAds.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(buildingAds, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Ad> delete(@PathVariable Long id) {
        Ad ad = adRepository.findById(id).orElse(null);
        if (ad == null)
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        adRepository.delete(ad);
        return new ResponseEntity<>( HttpStatus.OK);
    }

//    @GetMapping("/getAll")
//    public ResponseEntity<List<Ad>> getAll() {
//        return new ResponseEntity<>(adRepository.findAll(), HttpStatus.OK);
//    }

//    @GetMapping("/getById/{id}")
//    public ResponseEntity<Ad> getById(@PathVariable Long id) {
//        Ad ad = adRepository.findById(id).orElse(null);
//        if (ad == null) {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//        return new ResponseEntity<>(ad, HttpStatus.OK);
//    }

//    @PutMapping( "/update/{id}")
//    public ResponseEntity<Ad> put(@PathVariable Long id,@RequestBody Ad ad) {
//        Ad ad2 =adRepository.findById(id).orElse(null);
//        if (ad2 == null)
//            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
//        ad2.setTitle(ad.getTitle());
//        ad2.setText(ad.getText());
//        ad2.setDate(ad.getDate());
//        adRepository.save(ad2);
//        return new ResponseEntity<>(ad, HttpStatus.OK);
//    }

}
