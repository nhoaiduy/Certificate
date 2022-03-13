function activeItem(n){
    var list = document.getElementsByClassName("sidebar__item");
    var func = document.getElementsByClassName("function");
    for(var i = 0; i<list.length;i++){
        list[i].classList.remove("active");
        func[i].style.display = "none";
    }
    list[n-1].classList.add("active");
    func[n-1].style.display = "block";
}

function activeButton(n){
    if(n==2){
        document.getElementsByClassName("register__label")[0].innerText = "Đăng ký nhóm"
        document.getElementById("register-choice__personal").classList.replace("active-btn","inactive-btn");
        document.getElementById("register-choice__group").classList.replace("inactive-btn","active-btn");
        document.getElementsByClassName("register-choice__personal")[0].style.display = "none";
        document.getElementsByClassName("register-choice__group")[0].style.display = "block";
    }
    if(n==1){
        document.getElementsByClassName("register__label")[0].innerText = "Đăng ký cá nhân"
        document.getElementById("register-choice__personal").classList.replace("inactive-btn","active-btn");
        document.getElementById("register-choice__group").classList.replace("active-btn","inactive-btn");
        document.getElementsByClassName("register-choice__personal")[0].style.display = "block";
        document.getElementsByClassName("register-choice__group")[0].style.display = "none";
    }
}

function chooseCertificate(id){
    activeItem(3);
    let e = document.getElementsByTagName("option");
    for(var i = 1;i <e.length;i++){
        if(e[i].value == id){
            e[i].selected = "selected";
            break;
        }
    }
}

