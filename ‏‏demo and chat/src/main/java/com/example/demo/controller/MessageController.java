package com.example.demo.controller;

import com.example.demo.model.Message;
import com.example.demo.service.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/messages")
public class MessageController {

    @Autowired
    private MessageRepository messageRepository;

    @PostMapping("/addMessage")
    public ResponseEntity<Message> addMessage(@RequestBody Message message) {
        Message savedMessage = messageRepository.save(message);
        return new ResponseEntity<>(savedMessage, HttpStatus.CREATED); //201
    }

    @GetMapping("/getMessagesForChat/{senderId}")
    public ResponseEntity<List<Message>> getMessagesForChat(@PathVariable Long senderId, @RequestParam Long receiverId) {
        List<Message> Isend = messageRepository.findBySenderIdAndReceiverId(senderId, receiverId);
        List<Message> IReceived = messageRepository.findBySenderIdAndReceiverId(receiverId,senderId);
        List<Message> allMessages = new ArrayList<>();
        allMessages.addAll(Isend);
        allMessages.addAll(IReceived);
        allMessages.sort(Comparator.comparing(Message::getDate));
        return ResponseEntity.ok(allMessages);
    }

//    @GetMapping("/getAll")
//    public ResponseEntity<List<Message>> getAll() {
//        return new ResponseEntity<>(messageRepository.findAll(), HttpStatus.OK);
//    }

//    @GetMapping("/getById/{id}")
//    public ResponseEntity<Message> getById(@PathVariable Long id) {
//        Message message = messageRepository.findById(id).orElse(null);
//        if (message == null) {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//        return new ResponseEntity<>(message, HttpStatus.OK);
//    }

//    @PutMapping("/update/{id}")
//    public ResponseEntity<Message> update(@PathVariable Long id, @RequestBody Message message) {
//        Message message1 = messageRepository.findById(id).orElse(null);
//        if (message1 == null) {
//            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
//        }
//        message1.setSender(message.getSender());
//        message1.setSender(message.getSender());
//        message1.setReceiverId(message.getReceiverId());
//        message1.setDate(message.getDate());
//        message1.setText(message.getText());
//        messageRepository.save(message1);
//        return new ResponseEntity<>(message1,HttpStatus.OK);
//    }

//    @DeleteMapping("/delete/{id}")
//    public ResponseEntity<Void> delete(@PathVariable Long id) {
//        Message message = messageRepository.findById(id).orElse(null);
//        if (message == null) {
//            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
//        }
//        messageRepository.delete(message);
//        return new ResponseEntity<>(HttpStatus.OK);
//    }

}
