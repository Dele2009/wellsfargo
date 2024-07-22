document.addEventListener('DOMContentLoaded', function () {
    // Fake database
    const fakeDatabase = {
        users: [
            {
                name: 'Tunji Oladele',
                username: 'tunji@fargo',
                password: 'tunji100',
                checkingAccount: '329.11',
                platnumSavings: '376,531.31',
                mortage: '3000.00' // In a real application, passwords should be hashed
            },
            {
                name: 'Ahmed Faruq',
                username: 'ahmed@fargo',
                password: 'ahmed200',
                checkingAccount: '2000.00',
                platnumSavings: '500,629.87',
                mortage: '10,000.00'
            },
            {
                name: 'Adekunle Babalola',
                username: 'kunle@fargo',
                password: 'kunle300',
                checkingAccount: '400.00',
                platnumSavings: '50,008.96',
                mortage: '284.89'
            },
        ],
    };

    // Check if user is already logged in
    const loginUser = JSON.parse(localStorage.getItem('user')) || null;

    // Redirect based on login status
    const CurrentPage = window.location.pathname
    if (loginUser) {
        if (CurrentPage === '/') {
            window.location.href = '/dashboard.html';
        }
    } else {
        if (CurrentPage === '/dashboard.html') {
            window.location.href = '/';
        }
    }

    if (CurrentPage === '/') {
        const loginForm = document.getElementById('loginForm');

        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            const isLoggedIn = login(username, password);

            if (isLoggedIn) {
                window.location.href = '/dashboard.html';
            } else {
                // Clear the password field on failed login
                document.getElementById('password').value = '';
            }
        });

        function login(username, password) {
            // Find the user in the fake database
            const user = fakeDatabase.users.find(
                (user) => user.username === username && user.password === password
            );

            if (user) {
                console.log('Login successful');
                localStorage.setItem('user', JSON.stringify(user));
                return true;
            } else {
                console.log('Invalid username or password');
                alert('Invalid username or password');
                return false;
            }
        }
    } else if (CurrentPage === '/dashboard.html') {
        if (loginUser) {
            document.getElementById('name').textContent = loginUser.name;
            document.getElementById('check-acct-bl').textContent = loginUser.checkingAccount;
            document.getElementById('plat-acct-bl').textContent = loginUser.platnumSavings;
            document.getElementById('mort-acct-bl').textContent = loginUser.mortage;
            document.getElementById('logout-btn').addEventListener('click', logout)

            
        } else {
            window.location.href = '/';
        }
    }

    function logout(){
        localStorage.clear()
        window.location.href = '/'

    }
});
