 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
    import { getDatabase, ref, onValue, update, remove, push, set } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js";

    const firebaseConfig = {
      apiKey: "AIzaSyCkQIWw9iJPnNBYsnIDL-zDWDsHRok1mps",
      authDomain: "imagescheck-1fc28.firebaseapp.com",
      projectId: "imagescheck-1fc28",
      storageBucket: "imagescheck-1fc28.appspot.com",
      messagingSenderId: "105228",
      appId: "1:105228:web:example",
      databaseURL: "https://imagescheck-1fc28-default-rtdb.firebaseio.com"
    };

    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);

    // Create floating particles
    function createParticles() {
      const particlesContainer = document.getElementById('particles');
      const particleCount = window.innerWidth < 768 ? 30 : 60;
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random size between 1px and 4px
        const size = Math.random() * 3 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Random opacity
        particle.style.opacity = Math.random() * 0.4 + 0.1;
        
        // Add animation
        const duration = Math.random() * 25 + 15;
        particle.style.animation = `float ${duration}s infinite ease-in-out`;
        particle.style.animationDelay = `${Math.random() * 10}s`;
        
        particlesContainer.appendChild(particle);
      }
    }

    createParticles();

    const tableBody = document.getElementById("tableBody");
    const tableHeaders = document.getElementById("tableHeaders");
    const title = document.getElementById("title");
    const modal = document.getElementById("popupModal");
    const modalBody = document.getElementById("modalBody");
    const modalTitle = document.getElementById("modalTitle");
    const modalClose = document.querySelector(".modal-close");
    const refreshBtn = document.getElementById("refreshBtn");
    const scrollToTopBtn = document.getElementById("scrollToTop");

    const editModal = document.getElementById("editModal");
    const editTitle = document.getElementById("editTitle");
    const editSelect = document.getElementById("editSelect");
    const editDone = document.getElementById("editDone");
    const editClose = document.getElementById("editClose");
    const editCancel = document.getElementById("editCancel");

    const passwordModal = document.getElementById("passwordModal");
    const passwordModalTitle = document.getElementById("passwordModalTitle");
    const passwordValue = document.getElementById("passwordValue");
    const passwordModalSave = document.getElementById("passwordModalSave");
    const passwordModalCancel = document.getElementById("passwordModalCancel");
    const passwordModalClose = document.getElementById("passwordModalClose");

    const columnConfig = {
      "MallaUsersRoll": ["email", "date", "time", "batteryLevel", "os", "ip", "networkType", "ramSize", "image", "startroll", "endroll"],
      "Users": ["email", "date", "time", "batteryLevel", "os", "ip", "networkType", "ramSize", "selected", "clicked"],
      "UserSearch": ["email", "date", "time", "batteryLevel", "os", "ip", "networkType", "ramSize", "entered", "selected", "clicked"],
      "UsersRoll": ["email", "date", "time", "batteryLevel", "os", "ip", "networkType", "ramSize", "image", "startroll", "endroll", "clicked"],
      "Passwords": ["index", "value", "actions"]
    };

    // Enhanced modal functions with animations
    function showModal(title, content) {
      modalTitle.textContent = title;
      modalBody.textContent = content;
      modal.style.display = "flex";
      setTimeout(() => modal.classList.add("show"), 10);
      document.body.style.overflow = 'hidden';
    }

    function hideModal(modalElement) {
      modalElement.classList.remove("show");
      setTimeout(() => {
        modalElement.style.display = "none";
        document.body.style.overflow = 'auto';
      }, 300);
    }

    modalClose.onclick = () => hideModal(modal);
    editClose.onclick = () => hideModal(editModal);
    editCancel.onclick = () => hideModal(editModal);
    passwordModalClose.onclick = () => hideModal(passwordModal);
    passwordModalCancel.onclick = () => hideModal(passwordModal);

    window.onclick = e => {
      if (e.target === modal) hideModal(modal);
      if (e.target === editModal) hideModal(editModal);
      if (e.target === passwordModal) hideModal(passwordModal);
    };

    let currentEdit = { type: "", key: "", field: "", format: "" };
    let currentPasswordEdit = { key: null, index: null };

    // Add this with your other variable declarations
const toggleDetailsBtn = document.getElementById("toggleDetailsBtn");
let showDetails = true; // Default to showing details

// Add this event listener with your other event listeners
toggleDetailsBtn.addEventListener("click", () => {
  showDetails = !showDetails;
  toggleDetailsBtn.innerHTML = showDetails 
    ? '<i class="fas fa-eye-slash"></i> Hide Details' 
    : '<i class="fas fa-eye"></i> Show Details';
  
  const detailRows = document.querySelectorAll("#tableBody tr:not(.email-group-row)");
  detailRows.forEach(row => {
    row.style.display = showDetails ? "" : "none";
  });
});


    function loadData(type) {
  document.querySelector(".container").style.display = "block";
  document.getElementById("homeSection").style.display = "none";
  title.textContent = `${type} Data`;
  tableHeaders.innerHTML = "";
  tableBody.innerHTML = `<tr><td colspan="10" style="text-align: center; padding: 24px;"><span class="spinner"></span> Loading data...</td></tr>`;

  const columns = columnConfig[type];
  
  // Create table headers
  columns.forEach(col => {
    const th = document.createElement("th");
    th.textContent = col.charAt(0).toUpperCase() + col.slice(1).replace(/([A-Z])/g, ' $1');
    tableHeaders.appendChild(th);
  });

   const searchInput = document.getElementById("searchInput");
  searchInput.placeholder = type === "Passwords" 
    ? "Search passwords..." 
    : "Search by Email, IP, Date, or Time...";
  // Special case for Passwords section
  if (type === "Passwords") {
    loadPasswords();
    return;
  }

  const dataRef = ref(db, type);
  onValue(dataRef, snapshot => {
    const data = snapshot.val();
    if (!data) {
      tableBody.innerHTML = `<tr><td colspan="${columns.length}" style="text-align: center; padding: 24px;">No data available</td></tr>`;
      return;
    }

    const grouped = {};
    const allEmails = new Set();

    for (const key in data) {
      const baseData = data[key];
      const email = baseData?.email || baseData?.[1]?.email || key;
      allEmails.add(email);
      
      // Check if this is just an access/accessInfo record
      const isAccessOnly = (baseData.access || baseData.accessInfo) && 
                          !Array.isArray(baseData) && 
                          !Object.values(baseData).some(e => typeof e === "object" && !("value" in e));

      if (isAccessOnly) {
        if (!grouped[email]) {
          grouped[email] = { 
            rows: [], 
            access: baseData.access, 
            accessInfo: baseData.accessInfo, 
            key 
          };
        }
        // Add a minimal row with just the email
        grouped[email].rows.push({
          email: email,
          date: "N/A",
          time: "N/A",
          ip: "N/A",
          os: "N/A",
          batteryLevel: "N/A",
          networkType: "N/A",
          ramSize: "N/A"
        });
      } else {
        // Normal case with data rows
        const entries = Array.isArray(baseData)
          ? baseData
          : Object.values(baseData).filter(e => typeof e === "object" && !("value" in e));

        if (!grouped[email]) {
          grouped[email] = { 
            rows: [], 
            access: baseData.access, 
            accessInfo: baseData.accessInfo, 
            key 
          };
        }

        for (const entry of entries) {
          if (entry && typeof entry === "object") {
            grouped[email].rows.push(entry);
          }
        }
      }
    }

    const searchInput = document.getElementById("searchInput");
    const sortField = document.getElementById("sortField");

    function renderFilteredRows() {
      tableBody.innerHTML = "";
      const query = searchInput.value.toLowerCase().trim();
      const sortBy = sortField.value;
      const allRows = [];

      for (const email in grouped) {
        const { rows, key, access, accessInfo } = grouped[email];
        const matchingRows = rows.filter(row =>
          (row.email && row.email.toLowerCase().includes(query)) ||
          (row.ip && row.ip.toLowerCase().includes(query)) ||
          (row.date && row.date.toLowerCase().includes(query)) ||
          (row.time && row.time.toLowerCase().includes(query))
        );

        if (matchingRows.length > 0) {
          allRows.push({ email, key, rows: matchingRows, access, accessInfo });
        }
      }

      if (sortBy) {
        allRows.forEach(group => {
          group.rows.sort((a, b) => (a[sortBy] || "").localeCompare(b[sortBy] || ""));
        });
      }

      if (allRows.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="${columns.length}" style="text-align: center; padding: 24px;">No matching records found</td></tr>`;
        return;
      }

      for (const { email, key, rows, access, accessInfo } of allRows) {
        // Add email group row
        const labelRow = document.createElement("tr");
        labelRow.className = "email-group-row";
        const labelCell = document.createElement("td");
        labelCell.colSpan = columns.length;
        
        // Only show edit buttons if access or accessInfo exists
        const editButtons = [];
        if (access !== undefined) {
          editButtons.push(`<button onclick='editAccess("${type}", "${key}")' class="tooltip"><i class="fas fa-user-shield"></i> Access<span class="tooltiptext">Edit user access level</span></button>`);
        }
        if (accessInfo !== undefined) {
          editButtons.push(`<button onclick='editAccessInfo("${type}", "${key}")' class="tooltip"><i class="fas fa-info-circle"></i> Info<span class="tooltiptext">Edit user access info</span></button>`);
        }
        
        labelCell.innerHTML = `
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <span class="status-indicator ${(access?.value === 1 || access?.["1"] === 1) ? 'status-active' : 'status-inactive'}"></span>
              ${email}
            </div>
            ${editButtons.length > 0 ? `
            <div class="btn-group">
              ${editButtons.join('')}
            </div>
            ` : ''}
          </div>`;
        labelRow.appendChild(labelCell);
        tableBody.appendChild(labelRow);

        // Add data rows
        // Add data rows (only if showDetails is true)
if (showDetails) {
  rows.forEach(row => {
    const tr = document.createElement("tr");
    tr.innerHTML = columns.map(col => {
      if (col === "clicked" && Array.isArray(row.clicked)) {
        return `<td><button onclick='showModal("Clicked Items", "${row.clicked.join(", ").replace(/"/g, '\\"')}")'><i class="fas fa-eye"></i> View (${row.clicked.length})</button></td>`;
      }
      if (col === "selected" && typeof row.selectedvalues === "object") {
        const formatted = Object.entries(row.selectedvalues)
          .map(([k, v]) => `${k}: ${v}`)
          .join("\n");
        return `<td><button onclick='showModal("Selected Values", \`${formatted}\`)'><i class="fas fa-eye"></i> View</button></td>`;
      }
      if (col === "date") {
        return `<td class="date-time">${row.date}</td>`;
      }
      if (col === "time") {
        return `<td class="date-time">${row.time || "N/A"}</td>`;
      }
      if (col === "ip") {
        return `<td class="ip-address">${row.ip || "N/A"}</td>`;
      }
      return `<td>${row[col] !== undefined ? row[col] : "N/A"}</td>`;
    }).join("");
    tableBody.appendChild(tr);
  });
}
      }
    }

    searchInput.addEventListener("input", renderFilteredRows);
    sortField.addEventListener("change", renderFilteredRows);
    refreshBtn.onclick = () => loadData(type);
    renderFilteredRows();
  }, {
    onlyOnce: false
  });
}

    // Special function to load passwords
    function loadPasswords() {
      const searchInput = document.getElementById("searchInput");
      const sortField = document.getElementById("sortField");
      
      // Update placeholder for passwords section
      searchInput.placeholder = "Search passwords...";
      
      const dataRef = ref(db, "Passwords");
      onValue(dataRef, snapshot => {
        const data = snapshot.val();
        if (!data) {
          tableBody.innerHTML = `<tr><td colspan="3" style="text-align: center; padding: 24px;">No passwords stored yet</td></tr>`;
          return;
        }

        // Convert to array and add index
        const passwordsArray = Object.entries(data).map(([key, value]) => ({
          key,
          index: key,
          value
        }));

        function renderFilteredPasswords() {
          tableBody.innerHTML = "";
          const query = searchInput.value.toLowerCase().trim();
          const sortBy = sortField.value;
          
          // Filter passwords
          let filteredPasswords = passwordsArray.filter(pwd => 
            pwd.value.toLowerCase().includes(query) || 
            pwd.index.toString().includes(query)
          );

          // Sort if needed
          if (sortBy === "index") {
            filteredPasswords.sort((a, b) => a.index - b.index);
          } else if (sortBy === "value") {
            filteredPasswords.sort((a, b) => a.value.localeCompare(b.value));
          }

          if (filteredPasswords.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="3" style="text-align: center; padding: 24px;">No matching passwords found</td></tr>`;
            return;
          }

          // Add "Add Password" row at the top
          const addRow = document.createElement("tr");
          addRow.innerHTML = `
            <td colspan="3">
              <div class="add-password-form">
                <input type="text" id="newPassword" placeholder="Enter new password">
                <button id="addPasswordBtn"><i class="fas fa-plus"></i> Add Password</button>
              </div>
            </td>
          `;
          tableBody.appendChild(addRow);

          // Add password rows
          filteredPasswords.forEach(pwd => {
            const tr = document.createElement("tr");
            tr.className = "password-row";
            tr.innerHTML = `
              <td>${pwd.index}</td>
              <td>${pwd.value}</td>
              <td class="password-actions">
                <button class="edit-btn" onclick="editPassword('${pwd.key}', ${pwd.index}, '${pwd.value.replace(/'/g, "\\'")}')">
                  <i class="fas fa-edit"></i> Edit
                </button>
                <button class="delete-btn" onclick="deletePassword('${pwd.key}')">
                  <i class="fas fa-trash"></i> Delete
                </button>
              </td>
            `;
            tableBody.appendChild(tr);
          });

          // Add event listener for add password button
          document.getElementById("addPasswordBtn").addEventListener("click", addNewPassword);
        }

        searchInput.addEventListener("input", renderFilteredPasswords);
        sortField.addEventListener("change", renderFilteredPasswords);
        refreshBtn.onclick = () => loadPasswords();
        renderFilteredPasswords();
      }, {
        onlyOnce: false
      });
    }

    // Function to add a new password
    function addNewPassword() {
      const newPasswordInput = document.getElementById("newPassword");
      const passwordValue = newPasswordInput.value.trim();
      
      if (!passwordValue) {
        alert("Please enter a password");
        return;
      }

      // Generate a new index (timestamp)
      const newIndex = Date.now();
      
      // Add to Firebase
      const newPasswordRef = ref(db, `Passwords/${newIndex}`);
      set(newPasswordRef, passwordValue)
        .then(() => {
          newPasswordInput.value = ""; // Clear input
          showModal("Success", "Password added successfully!");
        })
        .catch(error => {
          showModal("Error", `Failed to add password: ${error.message}`);
        });
    }

    // Function to edit password (exposed to global scope)
    window.editPassword = (key, index, currentValue) => {
      currentPasswordEdit = { key, index };
      passwordValue.value = currentValue;
      passwordModalTitle.textContent = `Edit Password #${index}`;
      passwordModal.style.display = "flex";
      setTimeout(() => passwordModal.classList.add("show"), 10);
    };

    // Function to delete password (exposed to global scope)
    window.deletePassword = (key) => {
      if (confirm("Are you sure you want to delete this password?")) {
        const passwordRef = ref(db, `Passwords/${key}`);
        remove(passwordRef)
          .then(() => {
            showModal("Success", "Password deleted successfully!");
          })
          .catch(error => {
            showModal("Error", `Failed to delete password: ${error.message}`);
          });
      }
    };

    // Save edited password
    passwordModalSave.addEventListener("click", () => {
      const { key } = currentPasswordEdit;
      const newValue = passwordValue.value.trim();
      
      if (!newValue) {
        alert("Please enter a password value");
        return;
      }

      // Show loading state
      passwordModalSave.innerHTML = '<span class="spinner" style="width: 16px; height: 16px; border-width: 2px;"></span> Saving...';
      passwordModalSave.disabled = true;

      const passwordRef = ref(db, `Passwords/${key}`);
      set(passwordRef, newValue)
        .then(() => {
          passwordModalSave.innerHTML = '<i class="fas fa-check"></i> Saved!';
          setTimeout(() => {
            hideModal(passwordModal);
            setTimeout(() => {
              passwordModalSave.innerHTML = '<i class="fas fa-save"></i> Save';
              passwordModalSave.disabled = false;
            }, 300);
          }, 500);
        })
        .catch(error => {
          alert("Failed to update password: " + error.message);
          passwordModalSave.innerHTML = '<i class="fas fa-save"></i> Save';
          passwordModalSave.disabled = false;
        });
    });

    window.editAccess = (type, key) => {
      const path = ref(db, `${type}/${key}/access`);
      onValue(path, snapshot => {
        const val = snapshot.val();
        const accessValue = type === "Users" ? val?.["1"] : val?.value;
        currentEdit = { type, key, field: "access", format: type === "Users" ? "users" : "default" };
        editTitle.textContent = "Edit Access Level";
        editSelect.value = accessValue != null ? accessValue : 0;
        editModal.style.display = "flex";
        setTimeout(() => editModal.classList.add("show"), 10);
      }, { onlyOnce: true });
    };

    window.editAccessInfo = (type, key) => {
      const path = ref(db, `${type}/${key}/accessInfo`);
      onValue(path, snapshot => {
        const val = snapshot.val();
        const accessInfoValue = val?.value;
        currentEdit = { type, key, field: "accessInfo", format: "default" };
        editTitle.textContent = "Edit Access Info";
        editSelect.value = accessInfoValue != null ? accessInfoValue : 0;
        editModal.style.display = "flex";
        setTimeout(() => editModal.classList.add("show"), 10);
      }, { onlyOnce: true });
    };

    editDone.onclick = () => {
      const { type, key, field, format } = currentEdit;
      const value = parseInt(editSelect.value);
      const updateData = field === "access"
        ? (format === "users" ? { access: { "1": value } } : { access: { value } })
        : { accessInfo: { value } };

      // Show loading state
      editDone.innerHTML = '<span class="spinner" style="width: 16px; height: 16px; border-width: 2px;"></span> Saving...';
      editDone.disabled = true;

      update(ref(db, `${type}/${key}`), updateData)
        .then(() => {
          editDone.innerHTML = '<i class="fas fa-check"></i> Saved!';
          setTimeout(() => {
            hideModal(editModal);
            setTimeout(() => {
              editDone.innerHTML = '<i class="fas fa-check"></i> Save Changes';
              editDone.disabled = false;
            }, 300);
          }, 500);
        })
        .catch(err => {
          alert("Failed to update: " + err.message);
          editDone.innerHTML = '<i class="fas fa-check"></i> Save Changes';
          editDone.disabled = false;
        });
    };

function showHomeDashboard() {
  document.querySelector(".container").style.display = "none";
  document.getElementById("homeSection").style.display = "block";
  title.textContent = "Home";

  const sections = ["Users", "UsersRoll", "UserSearch"];
  const today = new Date();
  // Create both possible date formats
  const todayFormatted1 = `${today.getMonth()+1}/${today.getDate()}/${today.getFullYear()}`; // M/D/YYYY
  const todayFormatted2 = `${String(today.getDate()).padStart(2,'0')}/${String(today.getMonth()+1).padStart(2,'0')}/${today.getFullYear()}`; // DD/MM/YYYY
  const totalVisitorsSet = new Set();
  
  const listMap = {
    Users: document.getElementById("usersList"),
    UsersRoll: document.getElementById("usersRollList"),
    UserSearch: document.getElementById("userSearchList"),
  };

  const countMap = {
    Users: document.getElementById("usersCount"),
    UsersRoll: document.getElementById("usersRollCount"),
    UserSearch: document.getElementById("userSearchCount"),
  };

  // Clear lists and show loading state
  Object.values(listMap).forEach(list => {
    list.innerHTML = "<li style='text-align: center; padding: 16px; color: var(--text-muted);'><span class='spinner'></span> Loading...</li>";
  });

  // Reset counts
  Object.values(countMap).forEach(count => {
    count.textContent = "0";
  });

  document.getElementById("visitorCount").textContent = "Calculating...";
  document.querySelector("#totalVisitors .spinner").style.display = "inline-block";

  sections.forEach(type => {
    const list = listMap[type];
    const count = countMap[type];
    const refPath = ref(db, type);

    onValue(refPath, snapshot => {
      const data = snapshot.val();
      if (!data) {
        list.innerHTML = "<li style='text-align: center; padding: 16px; color: var(--text-muted);'>No data available</li>";
        count.textContent = "0";
        return;
      }

      const todayEmails = [];
      list.innerHTML = "";

      for (const key in data) {
        const records = Array.isArray(data[key]) ? data[key] : Object.values(data[key]);
        for (const entry of records) {
          if (entry && typeof entry === "object") {
            // Check both date formats
            if (entry.date === todayFormatted1 || entry.date === todayFormatted2) {
              const email = entry.email || key;
              todayEmails.push({
                email,
                time: entry.time || "N/A",
                ip: entry.ip || "N/A",
                os: entry.os || "Unknown",
                battery: entry.batteryLevel || "N/A"
              });
              totalVisitorsSet.add(email);
            }
          }
        }
      }

      // Update count
      count.textContent = todayEmails.length.toString();

      if (todayEmails.length === 0) {
        list.innerHTML = "<li style='text-align: center; padding: 16px; color: var(--text-muted);'>No visitors today</li>";
      } else {
        todayEmails.sort((a, b) => b.time.localeCompare(a.time)).forEach(item => {
          const li = document.createElement("li");
          li.className = "hover-scale";
          li.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span>${item.email}</span>
              <span style="font-size: 13px; color: var(--text-muted);">${item.time}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-top: 6px;">
              <span style="font-size: 12px; color: var(--text-muted);"><i class="fas fa-globe"></i> <span class="ip-address">${item.ip}</span></span>
              <span style="font-size: 12px; color: var(--text-muted);"><i class="fas fa-battery-three-quarters"></i> ${item.battery}%</span>
            </div>
            <div style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">
              <i class="fas fa-laptop"></i> ${item.os}
            </div>
          `;
          list.appendChild(li);
        });
      }

      // Update visitor count
      document.getElementById("visitorCount").textContent = `Total Unique Visitors Today: ${totalVisitorsSet.size}`;
      document.querySelector("#totalVisitors .spinner").style.display = "none";
    }, { onlyOnce: true });
  });
}
    window.showModal = showModal;

    // Scroll to top button
    window.onscroll = function() {
      if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        scrollToTopBtn.style.display = "flex";
      } else {
        scrollToTopBtn.style.display = "none";
      }
    };

    scrollToTopBtn.onclick = function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };

    // Initialize navigation
    document.querySelectorAll("nav button").forEach(button => {
      button.addEventListener("click", () => {
        document.querySelectorAll("nav button").forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const type = button.dataset.type;
        if (type === "Home") {
          showHomeDashboard();
        } else {
          loadData(type);
        }
      });
    });

    // Show home dashboard on initial load
    showHomeDashboard();
    // Add these with your other variable declarations
const websiteModal = document.getElementById("websiteModal");
const websiteFrame = document.getElementById("websiteFrame");
const openWebsiteBtn = document.getElementById("openWebsiteBtn");
const websiteModalClose = document.getElementById("websiteModalClose");

// Website URL - change this to your desired website
const WEBSITE_URL = "../pages/Searchcomplete.html"; // Replace with your website URL

// Add this event listener with your other event listeners
openWebsiteBtn.addEventListener("click", () => {
  websiteFrame.src = WEBSITE_URL;
  websiteModal.style.display = "flex";
  setTimeout(() => websiteModal.classList.add("show"), 10);
  document.body.style.overflow = 'hidden';
});

websiteModalClose.onclick = () => {
  websiteFrame.src = "about:blank";
  hideModal(websiteModal);

  document.querySelector('button[data-type="Passwords"]').click();
};

window.onclick = e => {
  if (e.target === modal) hideModal(modal);
  if (e.target === editModal) hideModal(editModal);
  if (e.target === passwordModal) hideModal(passwordModal);
  if (e.target === websiteModal) {
    websiteFrame.src = "about:blank";
    hideModal(websiteModal);
  }
};