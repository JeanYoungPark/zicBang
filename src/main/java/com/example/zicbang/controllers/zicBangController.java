package com.example.zicbang.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
public class zicBangController {
    @GetMapping("/")
    public String index(){
        return "index";
    }
}
