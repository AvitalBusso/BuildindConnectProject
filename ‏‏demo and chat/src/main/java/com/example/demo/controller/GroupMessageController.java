package com.example.demo.controller;

import com.example.demo.model.GroupMessage;
import com.example.demo.model.Message;
import com.example.demo.service.GroupMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/groupMessage")
public class GroupMessageController {

    @Autowired
    private GroupMessageRepository groupMessageRepository;

    @PostMapping("/addGroupMessage")
    public ResponseEntity<GroupMessage> addGroupMessage(@RequestBody GroupMessage message) {
        GroupMessage savedMessage = groupMessageRepository.save(message);
        return new ResponseEntity<>(savedMessage, HttpStatus.CREATED); //201
    }

    @GetMapping("/getMessagesForChat/{buildingId}")
    public ResponseEntity<List<GroupMessage>> getMessagesForChat(@PathVariable Long buildingId) {
        List<GroupMessage> buildingMessages = groupMessageRepository.findGroupMessageByBuildingId(buildingId);

        buildingMessages.sort(Comparator.comparing(GroupMessage::getDate));
        return new ResponseEntity<>(buildingMessages,HttpStatus.OK);
    }

//    @GetMapping("/getAll")
//    public ResponseEntity<List<GroupMessage>> getAll() {
//        return new ResponseEntity<>(groupMessageRepository.findAll(), HttpStatus.OK);
//    }

//    @GetMapping("/getById/{id}")
//    public ResponseEntity<GroupMessage> getById(@PathVariable Long id) {
//        GroupMessage message = groupMessageRepository.findById(id).orElse(null);
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
//        GroupMessage message = groupMessageRepository.findById(id).orElse(null);
//        if (message == null) {
//            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
//        }
//        groupMessageRepository.delete(message);
//        return new ResponseEntity<>(HttpStatus.OK);
//    }

}
