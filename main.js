const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const PLAYER_STORAGE_KEY = 'F8_PLAYER '

const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const cd = $('.cd')
const playBtn = $('.btn-toggle-play')
const container = $('.container')
const progress = $('#progress')
const progressWrap = $('.input-wrap')
const preBtn = $('.btn-prev')
const nextBtn = $('.btn-next')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const playList = $('.playlist')
const app = {
    preSong: 0,
    currentIndex: 0,
    isPlaying: false,
    isDraging: false,
    isRandom: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    setConfig: function(key, value) {
        this.config[key] = value
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))
    },
    songs: [
        {
            name: 'Đông',
            singer: 'Trúc Nhân',
            path: './assets/music/Dong-Truc-Nhan.mp3',
            image: './assets/img/dong.jpg',
        },
    
        {
            name: 'Grand Escape',
            singer: 'RADWIMPS',
            path: './assets/music/Grand-Escape-RADWIMPS-Toko-Miura.mp3',
            image: './assets/img/Weathering-with-You.jpg',
        },
    
        {
            name: 'Mơ',
            singer: 'Đức Phúc, Orange',
            path: './assets/music/Mo-OrangeDucPhuc-8276340.mp3',
            image: './assets/img/forest-studio-moitinhdau.png',
        },
    
        {
            name: 'Một ngàn nỗi đau',
            singer: 'Văn Mai Hương, Orange',
            path: './assets/music/mot-ngan-noi-dau.mp3',
            image: './assets/img/forest-studio.jpg',
        },
    
        {
            name: 'Nandemonaiya',
            singer: 'RADWIMPS',
            path: './assets/music/Nandemonaiya-Kimi-no-Na-wa-Your-Name-Your-Name.mp3',
            image: './assets/img/Sparkel.jpg',
        },
    
        {
            name: 'Tệ thật anh nhớ em',
            singer: 'Orange',
            path: './assets/music/TeThatAnhNhoEm-ForestStudioOrange.mp3',
            image: './assets/img/forest-studio.jpg',
        },
    
        {
            name: 'Thềm nhà có hoa',
            singer: 'Trúc Nhân, Văn Mai Hương',
            path: './assets/music/ThemNhaCoHoa-TrucNhanVanMaiHuongForestStudio-8317771.mp3',
            image: './assets/img/forest-studio.jpg',
        },
    
        {
            name: 'Thu Cạn',
            singer: 'Trúc Nhân',
            path: './assets/music/ThuCan.mp3',
            image: './assets/img/forest-studio.jpg',
        },
    
        {
            name: 'Sparkle',
            singer: 'RADWIMPS',
            path: './assets/music/Sparkle.mp3',
            image: './assets/img/Sparkel.jpg',
        },
    
        {
            name: 'Michishirube',
            singer: 'Minori Chihara',
            path: './assets/music/Michishirube.mp3',
            image: './assets/img/violet-evergarden.jpg',
        }
        
    ],
    render: function(){
        const htmls = this.songs.map((song, index) => {
            return `
                <div id= "song-${index}" class="song ${index === this.currentIndex ? 'active' : ''}" data-index = "${index}">
                    <div class="thumb" style="background-image: url(${song.image})"></div>
                    
                    <div class="body">
                        <h4 class="title">${song.name}</h4>
                        <p class="author">${song.singer}</p>
                    </div>

                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
            `
        })
        playList.innerHTML = htmls.join('');
    },
    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex]
            }
        })
    },
    handleEvents : function() {
        const _this = this
        const cdWidth = cd.offsetWidth
        // Xử lý CD quay / dừng 
        const cdThumbAnimate = cdThumb.animate([
            {transform: 'rotate(360deg)'}
        ], {
            duration: 10000,
            iterations: Infinity
        })
        cdThumbAnimate.pause()

        // Xử lí phóng to / thu nhỏ CD
        document.onscroll = function () {
            const scrollTop = window.scrollY || window.document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop;
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
            cd.style.opacity = newCdWidth / cdWidth;
        }


        
        // Xử lý khi ấn phát bài hát
        document.onkeydown = function (e) {
            e.preventDefault()
            if (e.which === 32 || e.which === 13){
                if (_this.isPlaying) {
                    audio.pause()
                }
                else {
                    audio.play()
                }
                
                // Khi bài hát được phát
                audio.onplay = function () {
                    _this.isPlaying = true
                    container.classList.add('playing')
                    cdThumbAnimate.play()
                }
    
                // Khi bài hát bị tạm dừng
                audio.onpause = function () {
                    _this.isPlaying = false
                    container.classList.remove('playing')
                    cdThumbAnimate.pause()
                }
    
    
                // Khi tiến độ bài hát thay đổi 
                audio.ontimeupdate = function () {
                    if (audio.duration) {
                        const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                        progress.value = progressPercent
    
                    }
                }
    
            
                // Xử lý khi tua bài hát
                progress.oninput = function (e) {
                    // Xử lý isDraging
                    progress.onmousedown = function () {
                        console.log(Math.random())
                    }
                    progress.onmouseup = function () {
                        console.log(Math.random())
                    }
                    const seekTime = e.target.value * (audio.duration / 100);
                    audio.currentTime = seekTime
                }
    
                // Khi bấm vào nút chuyển đến bài hát kế tiếp
                nextBtn.onclick = function() {
                    if (_this.isRandom) {
                        _this.randomSongs()
                    }
                    else {
                        _this.nextSong()
                    }
                    audio.play()
                }
    
                // Khi bấm vào nút chuyển về bài hát trước đó
                preBtn.onclick = function() {
                    if (_this.isRandom) {
                        _this.randomSongs()
                    }
                    else {
                        _this.backSong()
                    }
                    audio.play()
                }
    
                // Khi bấm vào nút phát bài hát ngẫu nhiên
                randomBtn.onclick = function () {
                    _this.isRandom = !_this.isRandom;
                   randomBtn.classList.toggle('active', _this.isRandom)
                }    
    
                // Xử lý chuyển bài khi hết nhạc 
                audio.onended = function () {
                    if (_this.isRandom) {
                        _this.randomSongs()
                        audio.play()
                    }
                    else {
                        _this.nextSong()
                        audio.play()
                    }
                }
    
            }
        }
        playBtn.onclick = function () {
            if (_this.isPlaying) {
                audio.pause()
            }
            else {
                audio.play()
            }
        }
            
            
        // Khi bài hát được phát
        audio.onplay = function () {
            _this.isPlaying = true
            container.classList.add('playing')
            cdThumbAnimate.play()
        }

        // Khi bài hát bị tạm dừng
        audio.onpause = function () {
            _this.isPlaying = false
            container.classList.remove('playing')
            cdThumbAnimate.pause()
        }


        // Khi tiến độ bài hát thay đổi 
        audio.ontimeupdate = function () {
            if (audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent

            }
        }

    
        // Xử lý khi tua bài hát
        progress.oninput = function (e) {
            // Xử lý isDraging
            progress.onmousedown = function () {
                console.log(Math.random())
            }
            progress.onmouseup = function () {
                console.log(Math.random())
            }
            const seekTime = e.target.value * (audio.duration / 100);
            audio.currentTime = seekTime
        }
        var songPlayed = [_this.currentIndex]
        function songsPlayed () {
            if (songPlayed.length < _this.songs.length -1) {
                songPlayed.push(_this.currentIndex)
            }
            else {
                songPlayed = [_this.currentIndex];
            }
        }
        // Khi bấm vào nút chuyển đến bài hát kế tiếp
        nextBtn.onclick = function() {
            if (_this.isRandom) {
                do {
                    _this.randomSongs()
                    audio.play()

                }while(songPlayed.includes(_this.currentIndex))
            }
            else {
                _this.nextSong()
                audio.play()
            }
            songsPlayed()
            _this.scrollToActiveSong()
            
        }

        // Khi bấm vào nút chuyển về bài hát trước đó
        preBtn.onclick = function() {
            if (_this.isRandom) {
                do {
                    _this.randomSongs()
                    audio.play()

                }while(songPlayed.includes(_this.currentIndex))
            }
            else {
                _this.backSong()
                audio.play()
            }
            songsPlayed()
            _this.scrollToActiveSong()
        }

        // Khi bấm vào nút phát bài hát ngẫu nhiên
        randomBtn.onclick = function () {
            if (_this.isRepeat) {
                repeatBtn.classList.remove('active')
                _this.isRepeat = false
                _this.setConfig('isRepeat', _this.isRepeat)

            }
            _this.isRandom = !_this.isRandom;
            _this.setConfig('isRandom', _this.isRandom)
            randomBtn.classList.toggle('active', _this.isRandom)
        } 
        
        // Khi bấm vào nút lặp lại bài hát 
        repeatBtn.onclick = function () {
            if (_this.isRandom) {
                randomBtn.classList.remove('active')
                _this.isRandom = false
                _this.setConfig('isRandom', _this.isRandom)

            }
            _this.isRepeat = !_this.isRepeat;
            _this.setConfig('isRepeat', _this.isRepeat)
            repeatBtn.classList.toggle('active', _this.isRepeat)
        }

        // Xử lý chuyển bài khi hết nhạc 
        audio.onended = function () {
            if (_this.isRandom) {
                do {
                    _this.randomSongs()
                    audio.play()

                }while(songPlayed.includes(_this.currentIndex))
            }
            
            else if (_this.isRepeat) {
                audio.play()
            }
            else {
                _this.nextSong()
                audio.play()
            }
            songsPlayed()
        }
        //  Lắng nghe hành vi chọn vào cả danh sách bài hát (thẻ cha)
        $('.playlist').onclick = function (e) {
            const songNode = e.target.closest('.song:not(.active')
            // Xử lý khi chọn để phát bài hát trong danh sách phát
            _this.preSong = _this.currentIndex
            if( songNode) {
                _this.currentIndex = Number(songNode.dataset.index)
                $(`#song-${_this.preSong}`).classList.remove('active')
                $(`#song-${_this.currentIndex}`).classList.add('active')
                _this.loadCurrenSongs()
                audio.play()
            }
            
        }
    },
    scrollToActiveSong: function () {
        setTimeout ( () => {
            $('.song.active').scrollIntoView({
                behavior: "smooth",
                block: "end"
            })
        }, 300) 
    },
    
    loadConfig: function () {
        this.isRandom = this.config.isRandom
        this.isRepeat = this.config.isRepeat
    },

    loadCurrenSongs: function () {
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
    },

    nextSong: function () {
        this.currentIndex++
        this.preSong = this.currentIndex -1;
        if(this.currentIndex >= this.songs.length) {
            this.currentIndex = 0
            this.preSong = this.songs.length -1;
        }   
        $(`#song-${this.preSong}`).classList.remove('active')
        $(`#song-${this.currentIndex}`).classList.add('active')
        this.loadCurrenSongs()
    },
    backSong: function () {
        this.currentIndex--
        this.preSong = this.currentIndex + 1;
        if(this.currentIndex < 0) {
            this.currentIndex = this.songs.length -1
            this.preSong = 0
        }
        $(`#song-${this.preSong}`).classList.remove('active')
        $(`#song-${this.currentIndex}`).classList.add('active')
        this.loadCurrenSongs()
    },

    randomSongs: function() {
        const currentIndexSong = this.currentIndex;
        do {
            this.currentIndex = Math.floor(Math.random() * this.songs.length)
        }
        while (currentIndexSong === this.currentIndex )
       $(`#song-${currentIndexSong}`).classList.remove('active')
       $(`#song-${this.currentIndex}`).classList.add('active')
        this.loadCurrenSongs()  
    },
    
    
    start: function() {
        // Gán cấu hình từ config vào ứng dụng 
        this.loadConfig()
        // Định nghĩa các thuộc tính cho object
        this.defineProperties()
        // Lắng nghe / Xử lý các sự kiện (DOM events)
        this.handleEvents()
        
        // Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
        this.loadCurrenSongs()
        
        // Render playlist
        this.render()
        
        // Hiển thị trạng thái ban đầu của nút lập lại và ngẫu nhiên 
        randomBtn.classList.toggle('active', this.isRandom)
        repeatBtn.classList.toggle('active', this.isRepeat)
    },
}

app.start ()