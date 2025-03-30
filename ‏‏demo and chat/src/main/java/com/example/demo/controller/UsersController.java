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
@RequestMapping("/api/users")
public class UsersController {

    @Autowired
    private UsersRepository usersRepository;

    @PostMapping("/addUser")
    public ResponseEntity<Users> addUser(@RequestBody Users user) {
        // חיפוש משתמש עם שם המשתמש
        Users existingUser = usersRepository.findByUserName(user.getUserName());

        if (existingUser == null) {
            // אם המשתמש לא קיים, שמירה והחזרה של משתמש חדש
            Users savedUser = usersRepository.save(user);
            return new ResponseEntity<>(savedUser, HttpStatus.CREATED); //201
        }
        // אם המשתמש כבר קיים, החזרת תגובת Conflict עם ה-ID של המשתמש הקיים
        return new ResponseEntity<>(existingUser, HttpStatus.CONFLICT); //409
    }

    @PostMapping("/login")
    public ResponseEntity<Users> logIn(@RequestBody Users u) {
        Users existingUser = usersRepository.findByUserName(u.getUserName());
        if (existingUser == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // 404
        }
        if (existingUser.getPassword().equals(u.getPassword())) {
            return new ResponseEntity<>(existingUser, HttpStatus.OK); // 200
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST); // 400
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Users> put(@PathVariable Long id, @RequestBody Users u) {
        Users u2 = usersRepository.findById(id).orElse(null);
        if (u2 == null)
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        u2.setUserName(u.getUserName());
        u2.setPassword(u.getPassword());
        u2.setEmail(u.getEmail());
        u2.setPhone(u.getPhone());
        u2.setStatus(u.getStatus());
        u2.setApartmentNumber(u.getApartmentNumber());
        u2.setFloor(u.getFloor());
        usersRepository.save(u2);
        return new ResponseEntity<>(u, HttpStatus.OK);
    }

//    @GetMapping("/getAll")
//    public ResponseEntity<List<Users>> getAll() {
//        return new ResponseEntity<>(usersRepository.findAll(), HttpStatus.OK);
//    }

//    @GetMapping("/getById/{id}")
//    public ResponseEntity<Users> getById(@PathVariable Long id) {
//        Users u = usersRepository.findById(id).orElse(null);
//        if (u == null)
//            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
//        return new ResponseEntity<>(u, HttpStatus.OK);
//    }

//    @DeleteMapping("/delete/{id}")
//    public ResponseEntity<Void> delete(@PathVariable Long id) {
//        Users u = usersRepository.findById(id).orElse(null);
//        if (u == null)
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        usersRepository.deleteById(id);
//        return new ResponseEntity<>(HttpStatus.OK);
//    }

}
