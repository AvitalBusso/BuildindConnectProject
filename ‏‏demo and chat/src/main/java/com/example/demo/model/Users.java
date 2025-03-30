package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.List;

enum Status {
    MANAGER,
    TENANT
}

@Entity
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userName;
    private String password;
    private String email;
    private String phone;

    @Enumerated(EnumType.STRING)
    private Status status;  // דייר או מנהל

    private int apartmentNumber;
    private int floor;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<Payment> paymentsList;

    @JsonIgnore
    @OneToMany(mappedBy = "sender")
    private List<Message> myMessagesList;

    @JsonIgnore
    @OneToMany(mappedBy = "sender")
    private List<GroupMessage> groupMessageList;

    @ManyToOne
    private Building building;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public int getApartmentNumber() {
        return apartmentNumber;
    }

    public void setApartmentNumber(int apartmentNumber) {
        this.apartmentNumber = apartmentNumber;
    }

    public int getFloor() {
        return floor;
    }

    public void setFloor(int floor) {
        this.floor = floor;
    }

    public List<Payment> getPaymentsList() {
        return paymentsList;
    }

    public void setPaymentsList(List<Payment> paymentsList) {
        this.paymentsList = paymentsList;
    }

    public Building getBuilding() {
        return building;
    }

    public void setBuilding(Building building) {
        this.building = building;
    }

    public List<Message> getMyMessagesList() {
        return myMessagesList;
    }

    public void setMyMessagesList(List<Message> myMessagesList) {
        this.myMessagesList = myMessagesList;
    }

    public List<GroupMessage> getGroupMessageList() {
        return groupMessageList;
    }

    public void setGroupMessageList(List<GroupMessage> groupMessageList) {
        this.groupMessageList = groupMessageList;
    }
}

