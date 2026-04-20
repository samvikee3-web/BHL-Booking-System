let userInfo;
let user;
let allBData = [];
let allInHData = [];
let allArchData = [];
let allCashData = [];
let allCashArchData =[];
let navBrand = document.querySelector(".navbar-brand");
let logoutBtn = document.querySelector('.logout-btn');
let bookingForm = document.querySelector(".booking-form");
let allBInput = bookingForm.querySelectorAll("input");
let bTextarea =bookingForm.querySelector("textarea");
let inHouseForm = document.querySelector(".inhouse-form");
let allInHInput = inHouseForm.querySelectorAll("input");
let InHTextarea = inHouseForm.querySelector("textarea");
let modalCBtn = document.querySelectorAll(".btn-close");
let bListTBody = document.querySelector(".booking-list");
let inHListTBody = document.querySelector(".inhouse-list");
let archListTBody = document.querySelector(".archive-list");
let bRegBtn = document.querySelector(".b-register-btn");
let inHRegBtn = document.querySelector(".in-house-reg-btn");
let allTabBtn = document.querySelectorAll(".tab-btn");
let searchEl = document.querySelector(".search-input");
let cashierBtn = document.querySelector(".cashier-tab");
let cashierTab = document.querySelector("#cashier");
let bookingTab = document.querySelector("#booking");
let cashierForm = document.querySelector(".cashier-form");
let allCInput = cashierForm.querySelectorAll("input");
let cashBtn = document.querySelector(".cash-btn");
let cashierTbody = document.querySelector(".cashier-list");
let cashTotal = document.querySelector(".total");
let closeCashierBtn = document.querySelector(".close-cashier-btn");
let cashierArchTbody = document.querySelector(".cashier-arch-list");
let archTotal = document.querySelector(".arch-total");
let allPrintBtn = document.querySelectorAll(".print-btn");
let archPrintBtn = document.querySelector(".arch-print-btn");
let cashierTabPan = document.querySelector(".cashier-tab-pan");
let allTotalBtn = document.querySelectorAll(".total-btn");
let showBCottagesEl = document.querySelector(".show-booking-cottages");
let showHCottagesEl = document.querySelector(".show-inhouse-cottages");
//check user is login or not
if(sessionStorage.getItem("__au__") == null)
{
    window.location = "../index.html";
}
userInfo = JSON.parse(sessionStorage.getItem("__au__"));
navBrand.innerHTML = userInfo.cottageName;
user = userInfo.email.split("@")[0];


//print coding
for(let btn of allPrintBtn)
{
    btn.onclick = () =>{
        window.print();
    }
}
archPrintBtn.onclick = () =>{
    cashierTabPan.classList.add('d-none');
    window.print();
}
modalCBtn[3].onclick = () =>{
    cashierTabPan.classList.remove('d-none');
}

//getting data from stroage
const fetchData = (key) =>{
    if(localStorage.getItem(key) !=null)
    {
        const data = JSON.parse(localStorage.getItem(key));
        return data;
    }
    else{
        return [];
    }
}
allBData = fetchData(user + "_allBData");
allInHData = fetchData(user + "_allInHData");
allArchData = fetchData(user + "_allArchData");
allCashData = fetchData(user + "_allCashData");
allCashArchData = fetchData(user + "_allCashArchData");


//format date function
const formatDate = (data,isTime) => {
    const date = new Date(data);
    let yy = date.getFullYear();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();
    let time = date.toLocaleTimeString();
    dd = dd < 10 ? "0" + dd : dd
    mm = mm < 10 ? "0"+ mm : mm
    return `${dd}-${mm}-${yy} ${isTime ? time : ''}`;
}
//registration coding
const registrationFunc = (textarea=null, inputs, array, storageKey) => {
     let data = {
        notice : textarea && textarea.value,
        inHouse  : false,
        createdAt : new Date()
    }
    for(let el of inputs)
    {
        let inputName = el.name;
        data[inputName] = el.value;
    }
    array.unshift(data);
    localStorage.setItem(storageKey, JSON.stringify(array));
    refreshAll(); 
    document.querySelector(".btn-close").click();
swal("Good Job !", "Booking Success", 'success');
}

//show data
const ShowData = (element, array, key) => {
    let tmp = key.split("_")[1];
    element.innerHTML = '';
    array.forEach((item, index) => {
        if (item) {
        element.innerHTML += `
<tr>
                                    <td class=" no-print text-nowrap">${index + 1}</td>
                                    <td class="text-nowrap">${item.location}</td>
                                    <td class="text-nowrap">${item.cottageName}</td>
                                    <td class="text-nowrap">${item.fullname}</td>
                                    <td class="text-nowrap">${item.gender}</td>
                                    <td class="text-nowrap">${item.checkInDate}</td>
                                    <td class="text-nowrap">${item.checkOutDate}</td>
                                    <td class="text-nowrap">${item.totalPeople}</td>
                                    <td class="text-nowrap">${item.mobile}</td>
                                    <td class="text-nowrap">${item.price}</td>
                                    <td class="text-nowrap">${item.notice}</td>
                                    <td class="text-nowrap no-print">${formatDate(item.createdAt,true)}</td>
                                    <td class="text-nowrap no-print">
                                        <button class="${tmp == 'allArchData' && 'd-none'} btn edit-btn p-1 px-2 btn-primary">
                                            <i class="fa fa-edit"></i>
                                        </button> 
                                        <button class="btn checkin-btn p-1 px-2 text-white btn-info">
                                            <i class="fa fa-check"></i>
                                        </button>
                                        <button class="btn del-btn p-1 px-2 btn-danger">
                                            <i class="fa fa-trash"></i>
                                        </button>
                                    </td>
                                    </tr> `;
        }
        
});
};
//delete coding
const deleteDataFunc = (element, array, key) => {
    let allDelBtn = element.querySelectorAll(".del-btn");
allDelBtn.forEach((btn, index) => {
    btn.onclick = () => {
        swal({
  title: "Are you sure?",
  text: "Once deleted, you will not be able to recover this imaginary file!",
  icon: "warning",
  buttons: true,
  dangerMode: true,
})
.then((willDelete) => {
  if (willDelete) {
      array.splice(index, 1);
     localStorage.setItem(key, JSON.stringify(array));
     refreshAll();
    swal("Poof! Your imaginary file has been deleted!", {
      icon: "success",
    });
  } else {
    swal("Your imaginary file is safe!");
  }
});
    
    }
});
}
// update coding
const updateDataFunc = (element,array,key) =>{
    let allEditBtn = element.querySelectorAll(".edit-btn");
    allEditBtn.forEach((btn,index)=>{
        btn.onclick = () =>{
            let tmp = key.split("_")[1];
            tmp == 'allBData' ? bRegBtn.click() : inHRegBtn.click()
     let allBtn = tmp == 'allBData' 
     ? bookingForm.querySelectorAll("button")
     : inHouseForm.querySelectorAll("button");

     let allInput = tmp == 'allBData' 
     ? bookingForm.querySelectorAll("input")
     : inHouseForm.querySelectorAll("input");

     let textarea = tmp == 'allBData' 
     ? bookingForm.querySelector("textarea")
     : inHouseForm.querySelector("textarea");

     allBtn[0].classList.add("d-none");
     allBtn[1].classList.remove("d-none");
     let obj = array[index];
     allInput[0].value = obj.fullname;
     allInput[1].value = obj.gender;
     allInput[2].value = obj.location;
     allInput[3].value = obj.cottageName;
     allInput[4].value = obj.totalPeople;
     allInput[5].value = obj.checkInDate;
     allInput[6].value = obj.checkOutDate;
     allInput[7].value = obj.price;
     allInput[8].value = obj.mobile;
     textarea.value = obj.notice;
     allBtn[1].onclick = ()=>{
        let formData = {
            notice : textarea.value,
            createdAt : new Date(),
        }
        for(let el of allInput)
        {
            let key = el.name;
            let value = el.value;
            formData[key] = value
        }
        array[index] = formData;
     allBtn[0].classList.remove("d-none");
     allBtn[1].classList.add("d-none");

     tmp == "allBData"
     ? bookingForm.reset('')
     : inHouseForm.reset('');
     
     tmp == "allBData"
     ? modalCBtn[0].click()
     : modalCBtn[1].click()
    
     localStorage.setItem(key,JSON.stringify(array));
        refreshAll();
;
     }

        }
    });
}

//checkin and checkout coding
const checkInAndCheckout = (element, array, key) => {
    let allCheckBtn = element.querySelectorAll(".checkin-btn");
    allCheckBtn.forEach((btn,index) => {
        btn.onclick = () => {
            let tmp = key.split("_")[1];
            let data = array[index];
            array.splice(index, 1);
            localStorage.setItem(key,JSON.stringify(array));
           if(tmp == "allBData")
           {
            allInHData = fetchData(user + "_allInHData");
            allInHData.unshift(data);
            localStorage.setItem(user + "_allInHData",JSON.stringify(allInHData));
            ShowBookingCottages();
            ShowInhouseCottages();
            }
            else if (tmp == "allArchData")
            {
                allBData = fetchData(user + "_allBData");
            allBData.unshift(data);
            localStorage.setItem(user + "_allBData",JSON.stringify(allBData));
            ShowBookingCottages();
            ShowInhouseCottages();
            }
           else if (tmp == "allInHData")
           {
            allArchData = fetchData(user + "_allArchData");
            allArchData.unshift(data);
            localStorage.setItem(user + "_allArchData",JSON.stringify(allArchData));
             }
             refreshAll();
             showTotal();
             ShowInhouseCottages();
             ShowBookingCottages();
          swal("Success", "Data Moved Successfully", "success");
            }
    });
};

//show booking cottages
const ShowBookingCottages = () =>{
   showBCottagesEl.innerHTML = '';
   allBData.forEach((item,index)=>{
         showBCottagesEl.innerHTML += `
          <div class="card text-center px-0 col-md-2">
                                    <div class="bg-danger text-white fw-bold card-header">
                                        ${item.cottageName}
                                    </div>
                                    <div class="bg-success text-white fw-bold card-body">
                                        <p>${formatDate(item.checkInDate)}</p>
                                        <p>To</p>
                                        <p>${formatDate(item.checkOutDate)}</p>  
                                    </div>
                                </div> 
          
         `;
   })   

}
ShowBookingCottages();

//show inhouse cottages
const ShowInhouseCottages = () =>{
   showHCottagesEl.innerHTML = '';
   allInHData.forEach((item,index)=>{
         showHCottagesEl.innerHTML += `
          <div class="card text-center px-0 col-md-2">
                                    <div class="bg-danger text-white fw-bold card-header">
                                        ${item.cottageName}
                                    </div>
                                   <div class="card-body">
                                        <img src="${item.inHouse ?'../images/dummy1.png' : '../images/download1.png'}" class="w-100" alt=""> 
                                    </div>
                                     <div class="card-footer">
                                 <button class="in-btn action-btn btn text-white">
                                    In
                                 </button>
                                 <button class="out-btn action-btn btn text-white">
                                    Out
                                 </button>
                                </div>
                                </div> 
          
         `;
   });

   // in coding
     let allInBtn = showHCottagesEl.querySelectorAll(".in-btn");
     allInBtn.forEach((btn,index)=>{
        btn.onclick = () =>{
            let data = allInHData[index];
            data.inHouse = true;
            allInHData[index] = data;
            localStorage.setItem(user + "_allInHData",JSON.stringify(allInHData));
            ShowInhouseCottages();

        }
     })
     //out coding
     let allOutBtn = showHCottagesEl.querySelectorAll(".out-btn");
      allOutBtn.forEach((btn,index)=>{
        btn.onclick = () =>{
            let data = allInHData[index];
            data.inHouse = false;
            allInHData[index] = data;
            localStorage.setItem(user + "_allInHData",JSON.stringify(allInHData));
            ShowInhouseCottages();

        }
     })
}
ShowInhouseCottages();


//show total coding
const showTotal = () =>{
    allTotalBtn[0].innerText = "Total Booking = "+allBData.length;
    allTotalBtn[1].innerText = "Total Inhouse = "+allInHData.length;
    allTotalBtn[2].innerText = "Total Archive = "+allArchData.length;
}
showTotal();

// logout coding
logoutBtn.onclick = () =>{
    logoutBtn.innerHTML = "Please wait...";
    setTimeout(()=>{
        logoutBtn.innerHTML = "Logout";
sessionStorage.removeItem("__au__");
window.location = "../index.html";
    },3000)
}

//start booking coding
bookingForm.onsubmit = (e) => {
    e.preventDefault();
    registrationFunc(bTextarea, allBInput, allBData, user +"_allBData");
    bookingForm.reset();
    modalCBtn[0].click();
    refreshAll();
    showTotal();
    ShowBookingCottages();
}
//start cashier coding
cashierForm.onsubmit = (e) => {
    e.preventDefault();
    let currentName = allCInput[2].value;
    let data = {
        amount: allCInput[0].value,
        cottageName: allCInput[1].value,
        cashierName: currentName ? currentName : "Unknown",
        createdAt: new Date()
};
allCashData.unshift(data);
localStorage.setItem(user + "_allCashData",JSON.stringify(allCashData));
    cashierForm.reset();
    modalCBtn[2].click();
    showCashierhFunc();
    refreshAll();
    swal("Good job", "Entry saved by " + currentName, "success");
}
//start inhouse booking coding
    inHouseForm.onsubmit = (e) => {
    e.preventDefault();
    registrationFunc(InHTextarea, allInHInput, allInHData, user + "_allInHData");
    inHouseForm.reset('');
    modalCBtn[1].click();
    refreshAll();
    showTotal();
    ShowInhouseCottages();
    
}
const searchFunc = () => {
    let value = searchEl.value.toLowerCase();
    let tableEl = document.querySelector(".tab-content .search-pane.active");
    let tr = tableEl.querySelectorAll("tbody tr");
    for(let el of tr)
    {
        let SN = el.querySelectorAll("TD")[0].innerText;
        let location = el.querySelectorAll("TD")[1].innerText;
        let cottageName = el.querySelectorAll("TD")[2].innerText;
        let fullname = el.querySelectorAll("TD")[3].innerText;
        let mobile = el.querySelectorAll("TD")[8].innerText;
        let price = el.querySelectorAll("TD")[9].innerText;
        if (SN.indexOf(value) != -1)
        {
          el.classList.remove('d-none');
        }
        else if(location.toLowerCase().indexOf(value) != -1)
        {
         el.classList.remove('d-none');   
        }
        else if(cottageName.toLowerCase().indexOf(value) != -1)
        {
         el.classList.remove('d-none');   
        }
        else if(fullname.toLowerCase().indexOf(value) != -1)
        {
         el.classList.remove('d-none');   
        }
        else if(mobile.toLowerCase().indexOf(value) != -1)
        {
         el.classList.remove('d-none');   
        }
        else if(price.toLowerCase().indexOf(value) != -1)
        {
         el.classList.remove('d-none');   
        }
        else{
          el.classList.add('d-none');
        }
    }

}
//search coding
searchEl.oninput = () => {
    searchFunc()
}

// refresh ui data coding
for(let btn of allTabBtn)
{
    btn.onclick  = () =>{
    ShowData(bListTBody, allBData, user + "_allBData");
    ShowData(inHListTBody, allInHData, user + "_allInHData");
    ShowData(archListTBody, allArchData, user + "_allArchData");
    }
}



const refreshAll = () => {
     allBData = fetchData(user + "_allBData");
allInHData = fetchData(user + "_allInHData");
allArchData = fetchData(user + "_allArchData");
    ShowData(bListTBody, allBData, user + "_allBData");
    ShowData(inHListTBody, allInHData, user + "_allInHData");
    ShowData(archListTBody, allArchData, user + "_allArchData");
    setTimeout(() => {
        //booking
        if(allBData.length > 0) {
    deleteDataFunc(bListTBody, allBData, user + "_allBData");
    updateDataFunc(bListTBody, allBData, user + "_allBData");
    checkInAndCheckout(bListTBody, allBData, user + "_allBData");
        }
    //in house
    if(allInHData.length > 0) {
    deleteDataFunc(inHListTBody, allInHData, user + "_allInHData");
    updateDataFunc(inHListTBody, allInHData, user + "_allInHData");
    checkInAndCheckout(inHListTBody, allInHData, user + "_allInHData");
    }
    //archive
    if(allArchData.length > 0) {
    deleteDataFunc(archListTBody, allArchData, user + "_allArchData");
    checkInAndCheckout(archListTBody, allArchData, user + "_allArchData");
    }
    },300);
};
for(let btn of allTabBtn) {
    btn.onclick = () => {
        refreshAll();
    }
}
refreshAll();

//cashier coding
const showCashierhFunc = () =>{
    let totalAmount = 0;
    cashierTbody.innerHTML = '';
     allCashData.forEach((item,index)=>{
        totalAmount += Number(item.amount);
        cashierTbody.innerHTML += `
        <tr>
                                    <td>${index+1}</td>
                                    <td>${item.cottageName}</td>
                                    <td>${item.cashierName}</td>
                                    <td>${formatDate(item.createdAt,true)}</td>
                                    <td>${item.amount}</td>
                                    </tr>
        `;
     });
    cashTotal.innerHTML = "<i class='fa fa-rupee'></i>" +totalAmount;
}
showCashierhFunc();

//all archive cash coding
const showCashArchFunc = () =>{
    allCashArchData = fetchData(user + "_allCashArchData");
    let totalAmount = 0;
    cashierArchTbody.innerHTML = '';
     allCashArchData.forEach((item, index) => {
        totalAmount += Number(item.total);
        cashierArchTbody.innerHTML += `
        <tr>
                                    <td>${index+1}</td>
                                    <td>${item.cashierName}</td>
                                    <td>${formatDate(item.createdAt,true)}</td>
                                    <td>${item.total}</td>
                                    </tr>
        `;
     });
    archTotal.innerHTML = "<i class='fa fa-rupee'></i>" + totalAmount;
}
showCashArchFunc();

cashBtn.onclick =() =>{
     allCInput[2].value = "";

cashierBtn.onclick =() =>{
    allCInput[2].value = "";
    let savedName = sessionStorage.getItem("c_name");
   allCInput[2].value = savedName ? savedName : "";
    }
//close cashier coding
closeCashierBtn.onclick = () => {
    if(allCashData.length > 0) {
      let lastCashier = allCashData[0].cashierName;
      let data = {
        cashierName : lastCashier,
        total : cashTotal.innerText,
        createdAt : new Date()
      };
      allCashArchData.push(data);
      allCashData = [];
      localStorage.removeItem(user + "_allCashData");
      localStorage.setItem(user + "_allCashArchData",JSON.stringify(allCashArchData));
      showCashierhFunc();
      showCashArchFunc();
    }
    else
    {
      swal('Warning',"There no cash to close",'warning');
    }
}}