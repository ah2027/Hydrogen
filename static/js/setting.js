         const switches2 = document.getElementById('3');

         /*
         if(window.localStorage.getItem('v4Particles') != "") {
           if(window.localStorage.getItem('v4Particles') == "true") {
             switches2.checked = true;
           }
           else {
             switches2.checked = false;
           }
         }

         switches2.addEventListener('change', (event) => {
           if (event.currentTarget.checked) {
             window.localStorage.setItem('v4Particles', 'true');
           } else {
             window.localStorage.setItem('v4Particles', 'false');
           }
         });
         */





         if(window.localStorage.getItem('RandomBG') != "") {
           if(window.localStorage.getItem('RandomBG') == "true") {
             switches.checked = true;
           }
           else {
             switches.checked = false;
           }
         }

         switches.addEventListener('change', (event) => {
           if (event.currentTarget.checked) {
             window.localStorage.setItem('RandomBG', 'true');
           } else {
             window.localStorage.setItem('RandomBG', 'false');
           }
         });
