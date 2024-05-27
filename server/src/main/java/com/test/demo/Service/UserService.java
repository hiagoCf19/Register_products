package com.test.demo.Service;

import com.test.demo.dto.UserDataDTO;
import com.test.demo.exception.UserAlreadyExistException;
import com.test.demo.exception.UserNotFoundException;
import com.test.demo.model.User;
import com.test.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    public List<User> getUser(){
        return userRepository.findAll();
    }
    public User createUser(UserDataDTO data){
        getUserByEmail(data.email()).ifPresent((user)-> {
            throw new UserAlreadyExistException("O e-mail informado já está cadastrado.");
        });
        User newUser= new User();
        newUser.setName(data.nome());
        newUser.setEmail(data.email());
        userRepository.save(newUser);
        return newUser;
    }
    public void deleteUser(Long id){
        var user= getUserById(id);
        userRepository.delete(user);
    }
    private Optional<User> getUserByEmail(String email){
        return userRepository.findByEmail(email);
    }
    private User getUserById(Long id){
        return userRepository.findById(id).orElseThrow(()-> new UserNotFoundException("Usuário não existe"));
    }
}
