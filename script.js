const container = document.querySelector('.container');
const count = document.getElementById('count');
const amount = document.getElementById('amount');
const select = document.getElementById('movie');
const seats = document.querySelectorAll('.seat:not(.reserved)'); // Rezerve olmuş koltuklar dışındaki koltukları seçtim.

getFromLocalStorage(); // Sayfa yüklendiği anda local storage daki bilgileri tekrar sayfaya yükledim.
calculateTotal();

container.addEventListener('click', function(e){
    if(e.target.classList.contains('seat') && !e.target.classList.contains('reserved')){
        e.target.classList.toggle('selected');
        calculateTotal();
    }
});

select.addEventListener('change', function(e){
    calculateTotal();
});

function calculateTotal(){
    const selectedSeats = container.querySelectorAll('.seat.selected'); // Seçili koltukları değişkenime atadım.

    const selectedSeatsArr = []; // Seçili koltukları içerecek dizimi oluşturdum.
    const seatsArr = []; // Tüm koltukları içerecek dizimi oluşturdum.

    selectedSeats.forEach(function(seat){
        selectedSeatsArr.push(seat);
    }); // Seçili koltukların index bilgisini dizimin içine ekledim.

    seats.forEach(function(seat){
        seatsArr.push(seat);
    }); // Tüm koltukların index bilgisini dizimin içine ekledim.

    let selectedSeatIndexs = selectedSeatsArr.map(function(seat){
        return seatsArr.indexOf(seat);
    }); // Seçilen koltuğun hangi index numarasında olduğunu bize verir.

    let selectedSeatCount = selectedSeats.length; // Kaç tane koltuk seçildiğini hesaplayıp değişkene atadım.
    count.innerText = selectedSeatCount;
    amount.innerText = selectedSeatCount * select.value;

    saveToLocalStorage(selectedSeatIndexs); // Seçtiğim koltukların index bilgilerini local storage a kaydettim.
}

function getFromLocalStorage(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    
    if(selectedSeats != null && selectedSeats.length > 0){
        seats.forEach(function(seat, index){
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected');
            }
        });
    }

    
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if(selectedMovieIndex != null){
        select.selectedIndex = selectedMovieIndex;
    }
} // Sayfa yeniden yüklendiği anda local storage daki bilgileri tekrar ekranda göstereceğim fonksiyonu hazırladım.

function saveToLocalStorage(indexs){
    localStorage.setItem('selectedSeats', JSON.stringify(indexs));
    localStorage.setItem('selectedMovieIndex', select.selectedIndex);
} // Seçtiğimiz koltuğun index numarasını ve filmin index numarasını local storage a kaydeden fonksiyonumu hazırladım.