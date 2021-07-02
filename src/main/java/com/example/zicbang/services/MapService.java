package com.example.zicbang.services;

import com.example.zicbang.models.CityData;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;

import javax.servlet.http.HttpServletRequest;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MapService {

    public void saveData(HttpServletRequest req){
        List<CityData> list = new ArrayList<>();

        ClassPathResource resource = new ClassPathResource("static/source/cityData.json");

        try{
            byte[] bdata = FileCopyUtils.copyToByteArray(resource.getInputStream());
            String txt = new String(bdata, StandardCharsets.UTF_8);

            JSONParser jsonParser = new JSONParser();
            JSONObject jsonObject = (JSONObject) jsonParser.parse(txt);
            JSONArray jsonArray = (JSONArray) jsonObject.get("DATA");
            Iterator<JSONObject> iterator = jsonArray.iterator();
            //db에 넣기
            while (iterator.hasNext()) {
                System.out.println(iterator.next());
            }
        }catch (Exception e){
            System.out.println(e);
        }
    }
}
;