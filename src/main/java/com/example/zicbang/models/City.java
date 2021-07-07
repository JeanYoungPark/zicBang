package com.example.zicbang.models;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@Entity
@Table(name = "city")
public class City {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "sig_cd")
    private int sidCd;

    @Column(name = "sig_kor_nm")
    private String sigKorNm;

    @Column(name = "sig_eng_nm")
    private String sigEngNm;

    @Column(name = "esri_pk")
    private int esriPk;

    private double x;

    private double y;

    @Builder
    public City(int sidCd, String sigKorNm, String sigEngNm, int esriPk, double x, double y) {
        this.sidCd = sidCd;
        this.sigKorNm = sigKorNm;
        this.sigEngNm = sigEngNm;
        this.esriPk = esriPk;
        this.x = x;
        this.y = y;
    }
}
