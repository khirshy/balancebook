let accountCount = 0;

// Load existing accounts when the page loads
window.onload = function () {
    loadAccounts();
};

function createDiv(className = 'new-account', id = null) {
    accountCount++;

    const newAccount = document.createElement('div');
    newAccount.className = className;
    newAccount.id = id || `newAccount-${accountCount}`;
    newAccount.textContent = className;

    // Class input
    const classInput = document.createElement('input');
    classInput.type = 'text';
    classInput.placeholder = 'Enter new class name';

    // Update class name button
    const updateBtn = document.createElement('button');
    updateBtn.textContent = 'Update Class';
    updateBtn.onclick = () => {
        const newClass = classInput.value.trim();
        if (newClass) {
            newAccount.className = newClass;
            newAccount.textContent = newClass;
            saveAccounts(); // save updated class
        }
    };

    // Append everything
    newAccount.appendChild(document.createElement('br'));
    newAccount.appendChild(classInput);
    newAccount.appendChild(updateBtn);

    document.getElementById('accounts').appendChild(newAccount);
    saveAccounts(); // save new account
}

function saveAccounts() {
    const accounts = [];
    document.querySelectorAll('#accounts > div').forEach(div => {
        accounts.push({
            class: div.className,
            id: div.id
        });
    });
    localStorage.setItem('savedAccounts', JSON.stringify(accounts));
}

function loadAccounts() {
    const saved = localStorage.getItem('savedAccounts');
    if (saved) {
        const accounts = JSON.parse(saved);
        accounts.forEach(acc => createDiv(acc.class, acc.id));
        accountCount = accounts.length;
    }
}
