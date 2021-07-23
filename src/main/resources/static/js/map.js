$(document).ready(function(){

    $(".tabs li").on("click",function(){
        $(this).parents(".tabs").find("li").removeClass("on");
        $(this).addClass("on");
        $(this).parents(".tabs_wrapper").scrollLeft(75*($(this).index()-1));

        var maxP = $(this).attr("data-max");
        var minP = $(this).attr("data-min");
        $(".areas .info .price").text(price(minP, maxP));
    });

});

var markers = [];
var container = document.getElementById('mapWrap');
var options = {
    center: new kakao.maps.LatLng(37.5731294716, 126.979230044),
    level: 8 //지도의 레벨(확대, 축소 정도)
};

var map = new kakao.maps.Map(container, options);

function init(){
    $.ajax({
        url:"https://apis.zigbang.com/v2/local/price?geohash=wyd&local_level=2&period=3&transaction_type_eq=s",
        method:"get",
        dataType:"json"
    }).done(function(data){

        var bounds = new kakao.maps.LatLngBounds();
        var places = data.datas;

        for ( var i=0; i<data.datas.length; i++ ) {

            // 마커를 생성하고 지도에 표시합니다
            var placePosition = new kakao.maps.LatLng(places[i].lat, places[i].lng);
            addMarker(placePosition, places[i].id, places[i].name, data.datas[i].price['sales']['avg']);
            bounds.extend(placePosition);
        }
    });
}

//이미지 종류
function img_src(price){
    var imageSrc;
    if(price <= 150000){
        imageSrc = "https://apis.zigbang.com/marker/v6/local?mode=item&nameSize=1&level=up1&select=n&dpi=160";
    }else if(price <= 200000){
        imageSrc = "https://apis.zigbang.com/marker/v6/local?mode=item&nameSize=1&level=up3&select=n&dpi=160";
    }else{
        imageSrc = "https://apis.zigbang.com/marker/v6/local?mode=item&nameSize=1&level=up5&select=n&dpi=160";
    }

    return imageSrc;
}

function list(id){
    $("#list").show();

    $.ajax({
        url: 'https://apis.zigbang.com/property/biglab/local/'+id,
        method: 'get',
        dataType: 'json'
    }).done(data => {
        $("#list h3").text(data.address);
        $("#list .top.info h2").text(data.name);
        $("#list .top.info span").text(data.description);
        $("#list .apts .info .area em").text(data.name);

        $.each(data.price, function(index, item){
            $(".areas .tabs li").eq(index).attr("data-max",item.maxSalesPrice).attr("data-min",item.minSalesPrice);
        });

        $(".areas .tabs li:eq(0)").trigger("click");
        $(".areas .info .price").text(price(data.price[0].minSalesPrice, data.price[7].maxSalesPrice));
    }).fail(error=>{
        console.log(error);
    });

    var apts;

    $.ajax({
        url: `https://apis.zigbang.com/property/biglab/apartments/list?type=local&id=${id}&serviceType[0]=apt&serviceType[1]=offer&limit=5&order=viewCount`,
        method:'get',
        dataType:'json'
    }).done(data =>{
        $("#list .apts .info .more em").text(`+${data.count}`);
        apts = `[${data.ids.join()}]`;

        $.ajax({
            url: `https://apis.zigbang.com/property/biglab/apartments/listDetail?type=local&id=${id}&apts=${apts}&order=viewCount`,
            method:"get",
            dataType:"json"
        }).done(data=>{
            var htm = "";
            $.each(data.apts,function(index, item){
                var img = item.image?`<img src="${item.image}?w=400&h=300&q=70&a=1">`:"";
                htm += `<li>
                        <div class="img">${img}</div>
                        <p class="pd_info">
                            <span class="tit">${item.name}</span>
                            <span class="homes">${item.desc1}</span>
                            <span class="num">${item.desc2}</span>
                        </p>
                    </li>`;
                $("#list .apts .products").html(htm);
            });
        }).fail(error=>{
            console.log(error);
        });

    }).fail(error=>{
        console.log(error);
    });
}

function price(min, max){
    var val;

    if(min % 10000 == min) val = addComma(min);
    else {
        val = parseInt((min / 10000)) + "억" + addComma((min % 10000));
    }

    val += "~";

    if(max % 10000 == max) val += addComma(max);
    else {
        val += parseInt((max / 10000)) + "억" + addComma((max % 10000));
    }

    return val;
}

function addComma(num){
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ',');
}

function addMarker(position, id, title, price) {

    //이미지 종류
    var imageSrc = img_src(price)

    //이미지 설정
    var imageSize = new kakao.maps.Size(0, 0),
    markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize),
    marker = new kakao.maps.Marker({
        position: position,
        image: markerImage
    });

    //스타일
    var st = "display:flex;justify-content:center;align-items:center;flex-direction:column;width:85px;height:53px;background-image: url("+imageSrc+");text-align:center;",
    content = `<div class="icon" style="${st}" data="${id}" onclick="list(${id})">
        <div style="color:#fff;font-size:11px;">${title}</div>
        <div style="color:#fff;font-size:12px;">${price/10000}</div>
        </div>`,
    customOverlay = new kakao.maps.CustomOverlay({
        position: position,
        content: content
    });

    customOverlay.setMap(map); // 커스텀 오버레이를 지도에 표시합니다

    marker.setMap(map); // 지도 위에 마커를 표출합니다

    markers.push(marker);  // 배열에 생성된 마커를 추가합니다

    return marker;
}


init();