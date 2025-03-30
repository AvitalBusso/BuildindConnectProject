package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class Building {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String address;
    private double monthPrice;

    @JsonIgnore
    @OneToMany(mappedBy = "building")
    private List<Ad> announcementsList; //מודעות שקשורות לבניין

    @JsonIgnore
    @OneToMany(mappedBy = "building")
    private List<Users> tenantsList;  // דיירים בבניין

    @JsonIgnore
    @OneToMany(mappedBy = "building")
    private List<GroupMessage> groupMessageList;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public double getMonthPrice() {
        return monthPrice;
    }

    public void setMonthPrice(double monthPrice) {
        this.monthPrice = monthPrice;
    }

    public List<Ad> getAnnouncementsList() {
        return announcementsList;
    }

    public void setAnnouncementsList(List<Ad> announcementsList) {
        this.announcementsList = announcementsList;
    }

    public List<Users> getTenantsList() {
        return tenantsList;
    }

    public void setTenantsList(List<Users> tenantsList) {

        this.tenantsList = tenantsList;
    }

    public List<GroupMessage> getGroupMessageList() {
        return groupMessageList;
    }

    public void setGroupMessageList(List<GroupMessage> groupMessageList) {
        this.groupMessageList = groupMessageList;
    }
}

