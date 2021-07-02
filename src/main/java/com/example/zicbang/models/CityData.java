package com.example.zicbang.models;

import lombok.Builder;
import lombok.Setter;
import lombok.ToString;

@Builder
@Setter
@ToString
public class CityData {
    private Long OBJECTID;
    private int SID_CD;
    private String SIG_KOR_NM;
    private String SIG_ENG_NM;
    private int ESRI_PK;
    private Long X;
    private Long Y;
}
