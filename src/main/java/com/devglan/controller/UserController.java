package com.devglan.controller;

import com.devglan.dao.UserRepository;
import com.devglan.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@RestController
//@CrossOrigin(origins = {"http://localhost:4200"})
//@CrossOrigin(exposedHeaders="Access-Control-Allow-Origin")
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RequestMapping("/config")
public class UserController {

    @Autowired
    private UserRepository userRepository;
    @RequestMapping(value="/user/{id}",method=RequestMethod.GET)
    
    public ResponseEntity <User> getUserId(@PathVariable("id") Long id){
   	 User configParam = userRepository.findOne(id);


   	 
      return new ResponseEntity<User>(configParam,HttpStatus.OK);
      
     }
    @RequestMapping(value="/user", method = RequestMethod.GET)
    public List<User> listUsers(){
        return userRepository.findAll();
    }



    @RequestMapping(value="/user",method=RequestMethod.POST)
    
    public ResponseEntity<Void> addUser(@RequestBody User user,UriComponentsBuilder builder){
   	  userRepository.save(user);
   	  HttpHeaders headers = new HttpHeaders();
   	  headers.setLocation(builder.path("/user/{id}").buildAndExpand(user.getId()).toUri());
   	  return new ResponseEntity<Void>(headers,HttpStatus.CREATED);
    }
    @RequestMapping(value="/user/{id}" ,method=RequestMethod.PUT)
    
    public ResponseEntity<User> updateConfigParam(@RequestBody User user){
   	 
   	 userRepository.save(user);
   	 
   	 return new ResponseEntity<User>(user,HttpStatus.OK);
   	 
    }
    @RequestMapping(value="/user/{id}" ,method=RequestMethod.DELETE)
    public ResponseEntity<Void> deleteUser(@PathVariable("id") Long id){
   	 
   	 userRepository.delete(id);
   	 
   	 return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
   	 
   	 
    }
    
}
