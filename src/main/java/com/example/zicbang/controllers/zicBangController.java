package com.example.zicbang.controllers;

import com.example.zicbang.services.MapService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import javax.servlet.http.HttpServletRequest;

@Controller
@RequiredArgsConstructor
public class zicBangController {

    private final MapService mapService;

    @GetMapping("/")
    public String index(HttpServletRequest req){
        return "index";
    }

    @GetMapping("/home/{category}/map")
    public String map(Model model, @PathVariable String category){
        //지도 정보를 보내준다. (앞단에서 api 컨트롤 해봐야할 듯)
        model.addAttribute("category",category);
        return "map";
    }
}
