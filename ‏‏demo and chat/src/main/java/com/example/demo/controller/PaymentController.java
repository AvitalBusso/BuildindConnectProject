package com.example.demo.controller;

import com.example.demo.model.Building;
import com.example.demo.model.Payment;
import com.example.demo.model.Users;
import com.example.demo.service.BuildingRepository;
import com.example.demo.service.PaymentRepository;
import com.example.demo.service.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private PaymentRepository paymentRepository;
    @Autowired
    private UsersRepository usersRepository;

    @PostMapping("/addPayment")
    public ResponseEntity<Payment> addPayment(@RequestBody Payment payment) {
        Payment savedPayment = paymentRepository.save(payment);
        return new ResponseEntity<>(savedPayment, HttpStatus.CREATED); //201
    }

    @PostMapping("/addGeneralPayment/{BuildingId}")
    public ResponseEntity<List<Payment>> addGeneralPayment(@RequestBody Payment payment, @PathVariable Long BuildingId) {
        List<Users> tenants = usersRepository.findByBuildingId(BuildingId);
        List<Payment> payments = new ArrayList<>();
        for (Users user : tenants) {
            Payment tenantPayment = new Payment();
            tenantPayment.setPrice(payment.getPrice());
            tenantPayment.setPaid(payment.getPaid());
            tenantPayment.setDate(payment.getDate());
            tenantPayment.setUser(user);
            payments.add(paymentRepository.save(tenantPayment));
        }
        return new ResponseEntity<>(payments, HttpStatus.CREATED);
    }

    @GetMapping( "/getByUserId/{id}")
    public ResponseEntity<List<Payment>> getByUserId(@PathVariable Long id) {
        List <Payment> payments = paymentRepository.findAllByUserId(id);
        if (!payments.isEmpty())
            return new ResponseEntity<>(payments, HttpStatus.OK);
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }

    @PutMapping("/updatePaid/{id}")
    public ResponseEntity<Payment> updatePaid(@PathVariable Long id) {
        Payment payment1 = paymentRepository.findById(id).orElse(null);
        if (payment1 == null)
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        payment1.setPaid(!payment1.getPaid());
        paymentRepository.save(payment1);
        return new ResponseEntity<>(payment1, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        Payment payment = paymentRepository.findById(id).orElse(null);
        if (payment == null)
            return new ResponseEntity<>( HttpStatus.NOT_FOUND);
        paymentRepository.delete(payment);
        return new ResponseEntity<>(HttpStatus.OK);
    }

//    @GetMapping( "/getAll")
//    public ResponseEntity<List<Payment>> getAll() {
//        return new ResponseEntity<>(paymentRepository.findAll(), HttpStatus.OK);
//    }

//    @GetMapping( "/getById/{id}")
//    public ResponseEntity<Payment> getById(@PathVariable Long id) {
//        Payment payment =paymentRepository.findById(id).orElse(null);
//        if (payment == null)
//            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
//        return new ResponseEntity<>(payment, HttpStatus.OK);
//    }

//    @PutMapping("/update/{id}")
//    public ResponseEntity<Payment> update(@PathVariable Long id, @RequestBody Payment payment) {
//        Payment payment1 = paymentRepository.findById(id).orElse(null);
//        if (payment1 == null)
//            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
//        payment1.setDate(payment.getDate());
//        payment1.setPrice(payment.getPrice());
//        payment1.setPaid(payment.getPaid());
//        paymentRepository.save(payment1);
//        return new ResponseEntity<>(payment1, HttpStatus.OK);
//    }
}
