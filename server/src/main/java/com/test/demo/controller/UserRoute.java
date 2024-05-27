package com.test.demo.controller;

import com.test.demo.Service.UserService;
import com.test.demo.dto.UserDataDTO;
import com.test.demo.model.User;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@RestController
public class UserRoute {

    @Autowired
    private UserService userService;


    @PostMapping("/createUser")
    @Transactional
    public ResponseEntity postUser(@RequestBody @Valid UserDataDTO data, UriComponentsBuilder uriComponentsBuilder) {
        var newUser= userService.createUser(data);
        var uri= uriComponentsBuilder.path("/users/{id}").buildAndExpand(newUser.getId()).toUri();
        return ResponseEntity.created(uri).body(new UserDataDTO(newUser.getId(), newUser.getName(), newUser.getEmail()));
    }
    @GetMapping("/users")
    public List<User> getUsers(){
        var users= userService.getUser();
        return users;
    }
    @DeleteMapping("/deleteUser/{id}")
    @Transactional
    public ResponseEntity deleteUser(@PathVariable Long id){
        userService.deleteUser(id);
        return ResponseEntity.ok().build();
    }
}
