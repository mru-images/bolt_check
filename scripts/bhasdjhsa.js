import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
        import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js";
        import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

        const firebaseConfig = {
            apiKey: "AIzaSyCkQIWw9iJPnNBYsnIDL-zDWDsHRok1mps",
            authDomain: "imagescheck-1fc28.firebaseapp.com",
            projectId: "imagescheck-1fc28",
            storageBucket: "imagescheck-1fc28.appspot.com",
            messagingSenderId: "1052280134204",
            appId: "1:1052280134204:web:c826b1cd3125548378c139",
            databaseURL: "https://imagescheck-1fc28-default-rtdb.firebaseio.com"
        };
        const app = initializeApp(firebaseConfig);
        const db = getDatabase(app);
        const auth = getAuth(app);
        const provider = new GoogleAuthProvider();
        const globalConfig = { value: null };
        let relue=false;
        document.getElementById("johnSection").style.display = "none";
        onAuthStateChanged(auth, async (user) => {
            
            document.getElementById("loader").style.display = "flex";
            
            if (user) {
                const email = user.email;
                const hasAccess = await checkAndSetAccess(email);
                relue = await checkAndSetInfo(email);
                if(relue){
                    const options = [{value : "SSC Certificate" ,label:"SSC Certificate"},{value:"Inter Certificate",label:"Inter Certificate"},{value:"Aadhar",label:"Aadhar"},{label:"Caste Certificate",value:"Caste Certificate"},{value:"Income Certificate",label:"Income Certificate"}]
                    const append_menu = document.getElementById('menu1');
                    options.forEach((item)=>{
                    const opr = document.createElement('option');
                    opr.value = item.value;
                    opr.textContent = item.label;
                    append_menu.appendChild(opr);
                    })
                };
                if (hasAccess) {
                    document.getElementById("loader").style.display = "none";
                    document.getElementById("be").style.display = "none";
                    document.getElementById("jamesDisplay").textContent = email;
                    document.getElementById("profilePicture").src = user.photoURL;
                    document.getElementById("profilePicture").style.display = "block";
                    document.getElementById("aliceMessage").classList.remove("hidden");
                    document.getElementById("johnSection").style.display = "none";
                    document.getElementById("hide").style.display = "block";
                    document.getElementById("accessMessage").style.display = "none";
                    displayUserInfo(email);
                } else {
                    document.getElementById("be").style.display = "none";
                    document.getElementById("loader").style.display = "none";
                    document.getElementById("jamesDisplay").textContent = "";
                    document.getElementById("profilePicture").style.display = "none";
                    document.getElementById("aliceMessage").classList.add("hidden");
                    document.getElementById("hide").style.display = "none";
                    const johnSection = document.getElementById("johnSection");
                    johnSection.style.display = "block";
                    johnSection.innerHTML = `
                        <h1>Sign in with Google</h1>
                        <center>
                            <div class="ddess" id="johnSection">
                                <h3>Sorry.... <br><br>You no Longer have access. Please contact the administrator <strong></strong></h3>
                            </div>
                        </center>`;
                }
            } else {
                document.getElementById("be").style.display = "none";
                document.getElementById("loader").style.display = "none";
                document.getElementById("johnSection").style.display = "block";
                document.getElementById("hide").style.display = "none";
                document.getElementById("accessMessage").style.display = "none";
            }
        });
        
        async function checkAndSetAccess(email) {
            const sanitizedEmail = sanitizeKey(email);
            const accessPath = ref(db, `UsersRoll/${sanitizedEmail}/access`);
            const snapshot = await get(accessPath);
        
            if (snapshot.exists()) {
                const accessValue = snapshot.val().value;
                return accessValue === 1;
            } else {
                await set(ref(db, `UsersRoll/${sanitizedEmail}/access`), { value: 1 });
                return true;
            }
        }
        
        async function checkAndSetInfo(email) {
            const sanitizedEmail = sanitizeKey(email);
            const accessPath = ref(db, `UsersRoll/${sanitizedEmail}/accessInfo`);
            const snapshot = await get(accessPath);
        
            if (snapshot.exists()) {
                const accessValue = snapshot.val().value;
                return accessValue === 1;
            } else {
                await set(ref(db, `UsersRoll/${sanitizedEmail}/accessInfo`), { value: 0 });
                return false;
            }
        }
        

        document.getElementById("googleSignInBtn").addEventListener("click", signInWithGoogle);

        async function signInWithGoogle() {
            try {
                const result = await signInWithPopup(auth, provider);
                const user = result.user;
                const email = user.email;
                const profilePicUrl = user.photoURL; 
                document.getElementById("jamesDisplay").textContent = email;
                document.getElementById("profilePicture").src = profilePicUrl; 
                document.getElementById("profilePicture").style.display = "block"; 
                document.getElementById("aliceMessage").classList.remove("hidden");
                document.getElementById("johnSection").style.display = "none";
                document.getElementById("hide").style.display = "block";

                await displayUserInfo(email);
            } catch (error) {
                console.error("Error signing in with Google: ", error);
            }
        }

        function sanitizeKey(input) {
            return input.replace(/[.\$#\[\]\/]/g, '_'); 
        }
        function getInfo() {
            return relue;
        }
        async function displayUserInfo(email) {
            const sanitizedEmail = sanitizeKey(email);
            const batteryLevel = await getBatteryInfo();
            const networkType = getNetworkInfo();
            const ramSize = getRAMSize();
            const os = getOS();
            const ip = await getIPAddress();
            const currentDate = new Date();
            const date = currentDate.toLocaleDateString();
            const time = currentDate.toLocaleTimeString();
            const menu1 = sanitizeKey(document.getElementById('menu1').value);
            const menu2 = sanitizeKey(document.getElementById('startRoll').value); 
            const menu3 = sanitizeKey(document.getElementById('endRoll').value); 
            const nextIndex = await getNextIndex(sanitizedEmail);
            globalConfig.value = nextIndex;
            await set(ref(db, 'UsersRoll/' + sanitizedEmail + '/' + nextIndex), {
                email: sanitizedEmail,
                ip: ip,
                date: date,
                time: time,
                os: os,
                networkType: networkType,
                batteryLevel: batteryLevel,
                ramSize: ramSize,
                image: menu1,
                startroll: menu2,
                endroll: menu3
            });
        }

        async function getNextIndex(email) {
            const dbRef = ref(db);
            const snapshot = await get(child(dbRef, 'UsersRoll/' + email));
            if (snapshot.exists()) {
                const data = snapshot.val();
                return Object.keys(data).length + 1; 
            } else {
                return 1; 
            }
        }

        async function getIPAddress() {
            try {
                const response = await fetch('https://api.ipify.org?format=json');
                const data = await response.json();
                return data.ip;
            } catch (error) {
                return 'Error retrieving IP address.';
            }
        }

        function getBatteryInfo() {
            return navigator.getBattery().then(function(battery) {
                return (battery.level * 100).toFixed(0) + '%';
            });
        }

        function getNetworkInfo() {
            if (navigator.connection) {
                return navigator.connection.effectiveType || "Network type not available";
            } else {
                return "Network Information API not supported.";
            }
        }

        function getRAMSize() {
            return (navigator.deviceMemory || "RAM size not available") + " GB (Approximate)";
        }

        function getOS() {
            const userAgent = window.navigator.userAgent;
            const platform = window.navigator.platform;
            const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'];
            const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];
            const iosPlatforms = ['iPhone', 'iPad', 'iPod'];

            if (macosPlatforms.indexOf(platform) !== -1) return 'Mac OS';
            if (iosPlatforms.indexOf(platform) !== -1) return 'iOS';
            if (windowsPlatforms.indexOf(platform) !== -1) return 'Windows';
            if (/Android/.test(userAgent)) return 'Android';
            if (/Linux/.test(platform)) return 'Linux';

            return 'Unknown OS';
        }

        document.getElementById('che').addEventListener('click', addDb);
        async function addDb() {
            const email = document.getElementById('jamesDisplay').textContent;
            if (email) {
                const hasAccess = await checkAndSetAccess(email);
                if (hasAccess) {
                    handleGenerateImages();
                    displayUserInfo(email);
                } else {  
                    document.body.innerHTML = `<h1>Sign in with Google</h1>
                        <center>
                            <div class="ddess" id="johnSection">
                                <h3>Sorry.... <br><br>You no Longer have access. Please contact the administrator <strong></strong></h3>
                            </div>
                        </center>`;
                        
                }
            } else {
                alert('Please sign in with Google before submitting the values.');
            }
        }
        
          async function clicked(rollNumber) {
    const user = auth.currentUser; 
    if (user) {
        const email = user.email;
        const sanitizedEmail = sanitizeKey(email);  
        const index = globalConfig.value;  

        if (!index) {
            console.error("Index is not available.");
            return;
        }
        const clickedPath = ref(db, 'UsersRoll/' + sanitizedEmail + '/' + index + '/clicked');  
        const snapshot = await get(clickedPath);
        let rollNumbers = [];
        if (snapshot.exists()) {
            rollNumbers = snapshot.val(); 
        }
        rollNumbers.push(rollNumber);
        set(clickedPath, rollNumbers)
            .then(() => {
                console.log("Roll number appended successfully!");
            })
            .catch((error) => {
                console.error("Error appending roll number: ", error);
            });
    } else {
        console.error("User not signed in. Please sign in first.");
    }
}
window.getInfo = getInfo;
window.clicked = clicked;
    
