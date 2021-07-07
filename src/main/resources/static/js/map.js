$(document).ready(function(){

});
var markers = [];
var container = document.getElementById('mapWrap');
var options = {
    center: new kakao.maps.LatLng(37.5731294716, 126.979230044),
    level: 8 //지도의 레벨(확대, 축소 정도)
};

var map = new kakao.maps.Map(container, options);
var geocoder = new kakao.maps.services.Geocoder();
var ps = new kakao.maps.services.Places();
var infowindow = new kakao.maps.InfoWindow({zIndex:1});



// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
// var zoomControl = new kakao.maps.ZoomControl();
// map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

// 지도가 확대 또는 축소되면 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
// kakao.maps.event.addListener(map, 'zoom_changed', function() {
//
//     // 지도의 현재 레벨을 얻어옵니다
//     var level = map.getLevel();
//
//     var message = '현재 지도 레벨은 ' + level + ' 입니다';
//     console.log(message);
//     // https://apis.zigbang.com/property/biglab/apartments/listDetail?
//     // type=local&id=11215105&apts=%5B70112,80122,79201,9404,52071%5D&order=viewCount
//
// });

// 주소로 좌표를 검색합니다
// geocoder.addressSearch('제주특별자치도 제주시 첨단로 242', function(result, status) {
//
//     // 정상적으로 검색이 완료됐으면
//     if (status === kakao.maps.services.Status.OK) {
//
//         var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
//
//         // 결과값으로 받은 위치를 마커로 표시합니다
//         var marker = new kakao.maps.Marker({
//             map: map,
//             position: coords
//         });
//
//         // 인포윈도우로 장소에 대한 설명을 표시합니다
//         // var infowindow = new kakao.maps.InfoWindow({
//         //     content: '<div style="width:150px;text-align:center;padding:6px 0;">우리회사</div>'
//         // });
//         // infowindow.open(map, marker);
//
//         // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
//         map.setCenter(coords);
//     }
// });

// 키워드 검색을 요청하는 함수입니다
// function searchPlaces() {
//
//     var keyword = document.getElementById('keyword').value;
//     console.log(keyword);
//     if (!keyword.replace(/^\s+|\s+$/g, '')) {
//         alert('키워드를 입력해주세요!');
//         return false;
//     }
//
//     // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
//     ps.keywordSearch( keyword, placesSearchCB);
// }

// 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
// function placesSearchCB(data, status, pagination) {
//     if (status === kakao.maps.services.Status.OK) {
//
//         // 정상적으로 검색이 완료됐으면
//         // 검색 목록과 마커를 표출합니다
//         displayPlaces(data);
//
//         // 페이지 번호를 표출합니다
//         displayPagination(pagination);
//
//     } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
//
//         alert('검색 결과가 존재하지 않습니다.');
//         return;
//
//     } else if (status === kakao.maps.services.Status.ERROR) {
//
//         alert('검색 결과 중 오류가 발생했습니다.');
//         return;
//
//     }
// }

// 검색 결과 목록과 마커를 표출하는 함수입니다
// function displayPlaces(places) {
//
//     // menuEl = document.getElementById('menu_wrap'),
//     var listEl = document.getElementById('placesList'),
//         fragment = document.createDocumentFragment(),
//         bounds = new kakao.maps.LatLngBounds(),
//         listStr = '';
//
//     // 검색 결과 목록에 추가된 항목들을 제거합니다
//     removeAllChildNods(listEl);
//
//     // 지도에 표시되고 있는 마커를 제거합니다
//     removeMarker();
//
//     for ( var i=0; i<places.length; i++ ) {
//
//         // 마커를 생성하고 지도에 표시합니다
//         var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
//             marker = addMarker(placePosition, i),
//             itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다
//
//         // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
//         // LatLngBounds 객체에 좌표를 추가합니다
//         bounds.extend(placePosition);
//
//         // 마커와 검색결과 항목에 mouseover 했을때
//         // 해당 장소에 인포윈도우에 장소명을 표시합니다
//         // mouseout 했을 때는 인포윈도우를 닫습니다
//         (function(marker, title) {
//             kakao.maps.event.addListener(marker, 'mouseover', function() {
//                 displayInfowindow(marker, title);
//             });
//
//             kakao.maps.event.addListener(marker, 'mouseout', function() {
//                 infowindow.close();
//             });
//
//             itemEl.onmouseover =  function () {
//                 displayInfowindow(marker, title);
//             };
//
//             itemEl.onmouseout =  function () {
//                 infowindow.close();
//             };
//         })(marker, places[i].place_name);
//
//         fragment.appendChild(itemEl);
//     }
//
//     // 검색결과 항목들을 검색결과 목록 Elemnet에 추가합니다
//     listEl.appendChild(fragment);
//     // menuEl.scrollTop = 0;
//
//     // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
//     map.setBounds(bounds);
// }

// 검색결과 항목을 Element로 반환하는 함수입니다
// function getListItem(index, places) {
//
//     var el = document.createElement('li'),
//         itemStr = '<span class="markerbg marker_' + (index+1) + '"></span>' +
//             '<div class="info">' +
//             '   <h5>' + places.place_name + '</h5>';
//
//     if (places.road_address_name) {
//         itemStr += '    <span>' + places.road_address_name + '</span>' +
//             '   <span class="jibun gray">' +  places.address_name  + '</span>';
//     } else {
//         itemStr += '    <span>' +  places.address_name  + '</span>';
//     }
//
//     itemStr += '  <span class="tel">' + places.phone  + '</span>' +
//         '</div>';
//
//     el.innerHTML = itemStr;
//     el.className = 'item';
//
//     return el;
// }


// 지도 위에 표시되고 있는 마커를 모두 제거합니다
// function removeMarker() {
//     for ( var i = 0; i < markers.length; i++ ) {
//         markers[i].setMap(null);
//     }
//     markers = [];
// }

// 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
// function displayPagination(pagination) {
//     var paginationEl = document.getElementById('pagination'),
//         fragment = document.createDocumentFragment(),
//         i;
//
//     // 기존에 추가된 페이지번호를 삭제합니다
//     while (paginationEl.hasChildNodes()) {
//         paginationEl.removeChild (paginationEl.lastChild);
//     }
//
//     for (i=1; i<=pagination.last; i++) {
//         var el = document.createElement('a');
//         el.href = "#";
//         el.innerHTML = i;
//
//         if (i===pagination.current) {
//             el.className = 'on';
//         } else {
//             el.onclick = (function(i) {
//                 return function() {
//                     pagination.gotoPage(i);
//                 }
//             })(i);
//         }
//
//         fragment.appendChild(el);
//     }
//     paginationEl.appendChild(fragment);
// }

// 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
// 인포윈도우에 장소명을 표시합니다
// function displayInfowindow(marker, title) {
//     var content = '<div style="padding:5px;z-index:1;">' + title + '</div>';
//
//     infowindow.setContent(content);
//     infowindow.open(map, marker);
// }

// 검색결과 목록의 자식 Element를 제거하는 함수입니다
// function removeAllChildNods(el) {
//     while (el.hasChildNodes()) {
//         el.removeChild (el.lastChild);
//     }
// }

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

            // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
            // LatLngBounds 객체에 좌표를 추가합니다
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

function list(){
    //아이콘클릭시 정보
// https://apis.zigbang.com/property/biglab/local/11215
//아피트아이디들
// https://apis.zigbang.com/property/biglab/apartments/list?type=local&id=11215&serviceType[0]=apt&serviceType[1]=offer&limit=5&order=viewCount
//아이콘클릭시 아파트정보
// https://apis.zigbang.com/property/biglab/apartments/listDetail?type=local&id=11215&apts=%5B70112,80122,58065,79201,9404%5D&order=viewCount
//     $.ajax({
//         url: 'https://apis.zigbang.com/property/biglab/local/'+id,
//         method: 'get',
//         dataType: 'json'
//     }).done(function(data){
//         console.log(data)
//     });
}

// 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
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
    content = '<div class="icon" style="'+st+'" data="'+id+'">' +
        '<div style="color:#fff;font-size:11px;">'+title+'</div>'+
        '<div style="color:#fff;font-size:12px;">'+price/10000+'</div>'+
        '</div>',
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