import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
        import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
        import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js";

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
        const auth = getAuth(app);
        const provider = new GoogleAuthProvider();
        const db = getDatabase(app);
        const globalConfig = { value: null };
        let userEmail = '';
        let userProfileImage = '';
        let relu = false;
        function getInfo(){
            return relu;
        }
        document.getElementById("googleLoginBtn").addEventListener("click", () => {
            provider.setCustomParameters({
                prompt: 'select_account'
            });

            signInWithPopup(auth, provider)
                .then((result) => {
                    const user = result.user;
                })
                .catch((error) => {
                    console.error("Error signing in:", error);
                });
        });
        document.getElementById("googleLoginBtn").style.display = 'none';
        document.getElementById("headerContainer").style.display = 'none';
        onAuthStateChanged(auth, async (user) => {
    if (user) {
        const sanitizedEmail = sanitizeKey(user.email); 
        const userAccessRef = ref(db, 'Users/' + sanitizedEmail + '/access/1');
        relu = await checkAndSetInfo(user.email);
        if(relu){
            window.populateSelectMenu('menu1', [
                'SSC Certificate',
                'Inter Certificate',
                'Aadhar',
                'Caste Certificate',
                'Income Certificate',
            ])
        }
        get(userAccessRef).then((snapshot) => {
            if (snapshot.exists()) {
                if (snapshot.val() === 1) {
                    userEmail = user.email;
                    userProfileImage = user.photoURL;
                    document.getElementById("headerContainer").style.display = 'flex';
                    const welcomeMessage = document.getElementById("welcomeMessage");
                    const exampleHeading = document.getElementById("exampleHeading");
                    const selectContainer = document.getElementById("selectContainer");
                    const googleLogin = document.getElementById("googleLoginBtn");
                    const profileImage = document.getElementById("profileImage");
                    const somemiss = document.getElementById("somemiss");
                    document.getElementById("be").style.display = 'none';
                    somemiss.style.display = 'none';
                    googleLogin.style.display = 'none';
                    welcomeMessage.textContent = `Welcome, ${userEmail}`;
                    welcomeMessage.style.display = 'block';
                    exampleHeading.textContent = "Image Gallery";
                    selectContainer.style.display = 'block';
                    profileImage.src = userProfileImage;
                    profileImage.style.display = 'block';
                } else {
                    document.getElementById("headerContainer").style.display = 'flex';
                    document.getElementById("be").style.display = 'none';
                    document.body.innerHTML = `<div style="text-align: center; font-family: Arial, sans-serif;">
                        <h1 id="exampleHeading">Email Verification</h1>
                        <h3 style="color: white;">Sorry, you no longer have access.... Please contact the Administrator</h3>
                    </div>`;
                }
            } else {
                set(userAccessRef, 1).then(() => {
                    userEmail = user.email;
                    userProfileImage = user.photoURL;
                    document.getElementById("be").style.display = 'none';
                    const welcomeMessage = document.getElementById("welcomeMessage");
                    const exampleHeading = document.getElementById("exampleHeading");
                    const selectContainer = document.getElementById("selectContainer");
                    const googleLogin = document.getElementById("googleLoginBtn");
                    const profileImage = document.getElementById("profileImage");
                    const somemiss = document.getElementById("somemiss");
                    document.getElementById("headerContainer").style.display = 'flex';
                    somemiss.style.display = 'none';
                    googleLogin.style.display = 'none';
                    welcomeMessage.textContent = `Welcome, ${userEmail}`;
                    welcomeMessage.style.display = 'block';
                    exampleHeading.textContent = "Image Gallery";
                    selectContainer.style.display = 'block';
                    profileImage.src = userProfileImage;
                    profileImage.style.display = 'block';
                }).catch((error) => {
                    document.getElementById("headerContainer").style.display = 'flex';
                    document.getElementById("be").style.display = 'none';
                    console.error("Error setting access value:", error);
                    document.body.innerHTML = `<div style="text-align: center; font-family: Arial, sans-serif;">
                        <h1 id="exampleHeading">Email Verification</h1>
                        <h3 style="color: red;">An error occurred. Please try again later.</h3>
                    </div>`;
                });
            }
        }).catch((error) => {
            document.getElementById("headerContainer").style.display = 'flex';
            document.getElementById("be").style.display = 'none';
            console.error("Error checking access value:", error);
            document.body.innerHTML = `<div style="text-align: center; font-family: Arial, sans-serif;">
                <h1 id="exampleHeading">Email Verification</h1>
                <h3 style="color: red;">An error occurred. Please try again later.</h3>
            </div>`;
        });
    } else {
        document.getElementById("be").style.display = 'none';
        document.getElementById("googleLoginBtn").style.display = 'flex';
        document.getElementById("headerContainer").style.display = 'flex';
        const googleLogin = document.getElementById("googleLoginBtn");
        googleLogin.style.display = 'block';
        const profileImage = document.getElementById("profileImage");
        profileImage.style.display = 'none';
    }
});


async function checkAndSetInfo(email) {
            const sanitizedEmail = sanitizeKey(email);
            const accessPath = ref(db, `Users/${sanitizedEmail}/accessInfo`);
            const snapshot = await get(accessPath);
        
            if (snapshot.exists()) {
                const accessValue = snapshot.val().value;
                return accessValue === 1;
            } else {
                await set(ref(db, `Users/${sanitizedEmail}/accessInfo`), { value: 0 });
                return false;
            }
        }

        window.addEventListener('DOMContentLoaded', () => {
            const selectContainer = document.getElementById("selectContainer");
            const showSelectedBtn = document.getElementById("showSelectedBtn");

            showSelectedBtn.addEventListener('click', async () => {
const userAccessRef = ref(db, 'Users/' + sanitizeKey(userEmail) + '/access/1');
const accessSnapshot = await get(userAccessRef);

if (accessSnapshot.exists() && accessSnapshot.val() === 1) {
    const selectedImage = document.getElementById('menu1').value;
    const selectedYear = document.getElementById('menu2').value;
    const selectedBranch = document.getElementById('menu3').value;
    const selectedClass = document.getElementById('menu4').value;
    if (!selectedImage || !selectedYear || !selectedBranch || !selectedClass) {
        alert('Please select all values.');
        return;
    }
    showSelectedValues();
    const userRef = ref(db, 'Users/' + sanitizeKey(userEmail));
    const userCountSnapshot = await get(userRef);
    let userCount = userCountSnapshot.exists() ? Object.keys(userCountSnapshot.val()).length + 1 : 1; 
    const uniqueKey = userCount.toString();
    const batteryLevel = await getBatteryInfo();
    const networkType = getNetworkInfo();
    const ramSize = getRAMSize();
    const os = getOS();
    const ip = await getIPAddress();
    const currentDate = new Date();
    const date = currentDate.toLocaleDateString();
    const time = currentDate.toLocaleTimeString();
    globalConfig.value = uniqueKey;
    set(ref(db, `Users/${sanitizeKey(userEmail)}/${uniqueKey}`), {
        email: userEmail,
        ip: ip,
        date: date,
        time: time,
        os: os,
        networkType: networkType,
        batteryLevel: batteryLevel,
        ramSize: ramSize,
        selectedvalues: {
            image: selectedImage,
            year: selectedYear,
            branch: selectedBranch,
            class: selectedClass
        }
    }).then(() => {
    }).catch((error) => {
        console.error("Error appending selected values:", error);
    });

} else {
    document.body.innerHTML = `<div style="text-align: center; font-family: Arial, sans-serif;">
        <h1 id="exampleHeading">Email Verification</h1>
        <h3 style="color: white;">Sorry, you no longer have access.... Please contact the Administrator</h3>
    </div>`;
}
});


        });

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

    const clickedPath = ref(db, 'Users/' + sanitizedEmail + '/' + index + '/clicked');  
    const snapshot = await get(clickedPath);
    let rollNumbers = [];
    if (snapshot.exists()) {
        rollNumbers = snapshot.val();  
    }
    rollNumbers.push(rollNumber);
    set(clickedPath, rollNumbers)
        .then(() => {
           
        })
        .catch((error) => {
            console.error("Error appending roll number: ", error);
        });
} else {
    console.error("User not signed in. Please sign in first.");
}
}

function sanitizeKey(input) {
    return input.replace(/[.\$#\[\]\/]/g, '_'); 
}

window.clicked = clicked;
window.getInfo = getInfo;
