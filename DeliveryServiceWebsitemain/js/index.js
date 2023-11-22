window.onload=function(){
    /* 메인 메뉴 */

    //상위메뉴 호버 시 하위메뉴, 배경 슬라이드
    //하위메뉴 벗어나도 배경 호버 시 그대로 유지
    let upperMenus = document.querySelectorAll('.mainMenu>li'); /* 상하위메뉴 */
    let subMenus = document.querySelectorAll('.mainMenu li ul'); /* 하위메뉴 */
    let menuBack = document.querySelector('.menuBack'); /* 하위메뉴 배경 */

    /* 하위메뉴 배경 호버 */
    menuBack.addEventListener('mouseenter',(e)=>{
        menuBack.style.height='330px';
        subMenus.forEach((item, i)=>{
            subMenus[i].style.height='330px';
        });    
    });

    menuBack.addEventListener('mouseleave',(e)=>{
        menuBack.style.height=0;
        subMenus.forEach((item, i)=>{
            subMenus[i].style.height=0;
        });    
    });

    /* 상위메뉴 호버 */ 
    upperMenus.forEach((item,i)=>{

        upperMenus[i].addEventListener('mouseenter',(e)=>{
            menuBack.style.height='330px';
            subMenus.forEach((item, i)=>{
                subMenus[i].style.height='330px';
            });
        });

        upperMenus[i].addEventListener('mouseleave',(e)=>{
            menuBack.style.height=0;
            subMenus.forEach((item, i)=>{
                subMenus[i].style.height=0;
            });
        });

    });
    
    //상위메뉴, 하위메뉴 호버 시 해당 상위메뉴 border-bottom 슬라이드
    let upperMenuBorder = document.querySelectorAll('.mainMenu>li>a');
    upperMenus.forEach((item,i)=>{
        upperMenus[i].addEventListener('mouseenter',(e)=>{
            upperMenuBorder[i].style.borderBottom='2px solid rgb(55, 212, 214)';
        });

        upperMenus[i].addEventListener('mouseleave',(e)=>{
            subMenus.forEach((item, i)=>{
                upperMenuBorder[i].style.borderBottom='2px solid white';
            });
        });
    });


    /* 공지사항 */

    //자동 이미지 슬라이드
    let noticeCount=0;
    setInterval(verticalSlide,1200);
    function verticalSlide(){
        if(noticeCount>6){
            $('.notice ul').stop().animate({
                top:0
            });
            noticeCount=0;            
        }else{
            $('.notice ul').stop().animate({
                top:-(noticeCount*41)
            });
            noticeCount++;
        }
    }


    /* 메인콘텐츠 - 유럽 섹션 */

    //이미지슬라이드 (세 개씩)
    //슬라이드 횟수 1회 -> 0회차: 왼쪽 화살표버튼 커서 default / 1회차: 오른쪽 화살표버튼 커서 default
    $('#europe .arrowL').click(function(){
        if ($('#europe ul li').css('left')!='-1200px'){
            return false;
        } else{
            $('#europe ul li').animate({
                left:'+=1200'
            },'slow');
                $('#europe .arrowL').css('cursor','default');
                $('#europe .arrowR').css('cursor','pointer');
        }
    });

    $('#europe .arrowR').click(function(){
        if ($('#europe ul li').css('left')!='0px'){
            return false;
        }else{
            $('#europe ul li').animate({
                left:'-=1200'
            },'slow'); 
                $('#europe .arrowL').css('cursor','pointer');
                $('#europe .arrowR').css('cursor','default');
        }
    });

    //이미지 호버 - 텍스트 슬라이드
    $('#europe ul li').hover(function(){
        i=$(this).index();
        $(this).find('.imgText').stop().slideToggle();
    });


    /* 메인콘텐츠 - 리뷰 섹션 */

    //이미지슬라이드 (하나씩)
    //이미지슬라이드 호버 시 멈춤
    let playbtn = document.querySelector('#review .play');
    let reviewSlideItems = document.querySelectorAll('#review ul li');
    let countReview=0;

    Slider=()=>{
        reviewSlide=setInterval(() => {
            if(countReview<4){
                reviewSlideItems.forEach((items,i)=>{
                    reviewSlideItems[i].style.left = -(400 * countReview) + 'px';
                });
                countReview++;
            }else if(countReview==4){
                reviewSlideItems.forEach((items,i)=>{
                    reviewSlideItems[i].style.left = '-1200px';
                });
                countReview++;
            }else if(countReview<7){
                reviewSlideItems.forEach((items,i)=>{
                    reviewSlideItems[i].style.left = (-1200 + ((countReview-4)*400)) + 'px';
                });
                countReview++;
            }else if(countReview==7){
                reviewSlideItems.forEach((items,i)=>{
                    reviewSlideItems[i].style.left =0;
                });
                countReview=0;
            }
        }, 2000);  
    }

    Slider();
        
    run=false;
    playbtn.addEventListener('click',()=>{
        if(run){
            Slider();
            playbtn.src='images/pause.png';
        }else{
            clearInterval(reviewSlide);
            playbtn.src='images/play.png';
        }
        run=!run;
    });




    // let imgI=[0,0];
    // $('#review .arrowL').click(function(){
    //     imgI[0]--;
    //     if (imgI[0]+imgI[1]<0){
    //         imgI[0]++;
    //         return false;
    //     } else if(imgI[0]+imgI[1]==2){
    //         $('#review .arrowR').show();
    //         $('#review ul li').animate({
    //             left:'+=400'
    //         },'slow');
    //     }else{
    //         $('#review ul li').animate({
    //             left:'+=400'
    //         },'slow');
    //     }
    // });

    // $('#review .arrowR').click(function(){
    //     imgI[1]++;
    //     if(imgI[0]+imgI[1]>3){
    //         imgI[1]--;
    //         return false;
    //     } else if(imgI[0]+imgI[1]==3){
    //         $(this).hide();
    //         $('#review ul li').animate({
    //             left:'-=400'
    //         },'slow');
    //     }else{
    //         $('#review ul li').animate({
    //             left:'-=400'
    //         },'slow');
    //     }
    // });            


    /* 국가별 고객센터 섹션*/
    
    //실시간 국가별 시간 표시, 고객센터 운영 여부 표시
    let timezones=['Japan','America/New_York',
            'Europe/Berlin','Europe/Madrid','Europe/London','Australia/Queensland',
            'Japan','Asia/Shanghai'];

    setInterval(function(){
        for (let i=0;i<timezones.length;i++){
            //날짜, 시간 입력
            let options = {
                year: '2-digit', month: 'numeric', day: 'numeric',
                hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle:'h23',
                timeZone: timezones[i]            
            }                    
            let intFormat = new Intl.DateTimeFormat('ko-KR', options);
            let now = new Date();
            let intTime = intFormat.format(now); 
            document.querySelector('#time'+(i+1)).innerHTML=intTime;

            //시 (계산용)
            let h = intFormat.formatToParts(now);
            let hour=h[6].value;

            //요일 (계산용)
            let option={timeZone: timezones[i],weekday:'short'}
            let intFormat2 = new Intl.DateTimeFormat('ko-KR', option);
            let weekdays=intFormat2.format(now);

            //시간별 운영 여부 표시
            if(weekdays=='토'||weekdays=='일'){
                $('.work').eq(i).html('휴일');
                $('.work').eq(i).css('background','rgb(255, 185, 185)');
            } else if(hour>=13 && hour<=14){
                $('.work').eq(i).html('점심 시간');
                $('.work').eq(i).css('background','rgb(255, 234, 157)');
            } else if(hour>=10 && hour<=17){
                $('.work').eq(i).html('운영 중');
                $('.work').eq(i).css('background','rgba(55, 212, 214,0.4)');
            } else {
                $('.work').eq(i).html('미운영');
                $('.work').eq(i).css('background','rgb(255, 185, 185)');
            } 
        }
    },1000);


    /* 좌측 해외주소 */ 

    //메뉴 호버 - 메뉴, 국기 슬라이드
    $('.intAddr section').hover(function(){
        $(this).children('.intAddrTitle').stop().animate({
            left:-10
        },500);
        $(this).children('.intAddrFlag').stop().animate({
            left:0
        },500);
    },function(){
        $(this).children('.intAddrTitle').stop().animate({
            left:0
        },500);
        $(this).children('.intAddrFlag').stop().animate({
            left:-855
        },500);
    });

    //해외주소 국기 클릭 - 팝업 show & hide
    //국기 마우스아웃해도 팝업 유지
    let onFlag=[false,false,false,false,false,false,false,false];
    $('.intAddrFlag img').click(function(){
        i=$(this).index();
        onFlag[i]=!onFlag[i];
        if(onFlag[i]){
            $('.flagPopup').hide(50,function(){
                onFlag=[false,false,false,false,false,false,false,false];
            });
            onFlag[i]=!onFlag[i];
            $('.flagPopup').eq(i).css('left',i*81).show();
        }else{
            $('.flagPopup').eq(i).css('left',i*81).hide();
        }
    })

    //팝업 X버튼 클릭 - 팝업 hide
    $('.flagPopup div').click(function(){
        i=$(this).parent().index();
        $(this).parent().hide();
        onFlag[i-2]=false;
    });
    

    /* 우측 리모콘 */

    //스크롤 따라 이동
    let rmcnOn;
    $(window).scroll(function(){
        rmcnOn=true;
    });

    setInterval(function(){
        if(rmcnOn){
            rmcnScroll();
            rmcnOn=false;
        }
    },100);

    function rmcnScroll(){
        let currentTop=parseInt($(window).scrollTop());
        $('.rmcnWrapper').stop().animate({
            top:currentTop+110
        });
    }

    //<버튼 클릭 - 리모콘 접기, >로 텍스트 대체
    let rmcnFold=false;
    $('.rmcn>div:last-child').click(function(){
        rmcnFold=!rmcnFold;
        if (rmcnFold){
            $(this).parent().animate({
                right:'-96%'
            },500,function(){
                $(this).children().eq(2).html('&lt;');
                $(this).parent('.rmcnWrapper').css('z-index',1);
            });
        } else {
            $(this).parent().animate({
                right:0
            },500,function(){
                $(this).children().eq(2).html('&gt;');
                $(this).parent('.rmcnWrapper').css('z-index',5);
            });
        }
    });

}