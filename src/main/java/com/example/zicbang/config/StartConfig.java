package com.example.zicbang.config;

import com.example.zicbang.models.City;
import com.example.zicbang.models.CityRepository;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import org.springframework.util.FileCopyUtils;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class StartConfig implements ApplicationRunner {

    private final CityRepository cityRepository;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        List<City> lists = new ArrayList<>();
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
                JSONObject ob = iterator.next();
                int sidCd = Integer.parseInt(ob.get("sig_cd").toString());
                int esriPk = Integer.parseInt(ob.get("esri_pk").toString());
                String sigEngNm = ob.get("sig_eng_nm").toString();
                String sigKorNm = ob.get("sig_kor_nm").toString();
                double x = Double.parseDouble(ob.get("x").toString());
                double y = Double.parseDouble(ob.get("y").toString());

                City list = City.builder()
                        .sidCd(sidCd)
                        .esriPk(esriPk)
                        .sigEngNm(sigEngNm)
                        .sigKorNm(sigKorNm)
                        .x(x)
                        .y(y)
                        .build();

                lists.add(list);
            }

            cityRepository.saveAll(lists);

        }catch (Exception e){
            System.out.println(e);
        }
    }
}
