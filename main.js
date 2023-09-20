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
const currentTimeSong = $('.current-song')
const durationSong = $('.duration-song')
const progressValue = $('.progress-value-song')
const volume = $('#volume')
const volumeValue = $('.volume-value')
const volumeWrap = $('.volume-wrap')
const volumeIconOn = $('.volume-icon-on')
const volumeIconOff = $('.volume-icon-off')
const addSong = $('.add-song')
const modal = $('.modal')
const overlay = $('.modal__overlay')
const app = {
    preSong: 0,
    currentIndex: 0,
    progressPercent: 0,
    currentTimeSeeking: 0,
    currentTimeSong: 0,
    currentVolume: 100,
    isPlaying: false,
    isDraging: false,
    isRandom: false,
    isRepeat: false,
    isMute: false,
    isModal: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    setConfig: function (key, value) {
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
        },

        {
            name: 'Anh tự do nhưng cô đơn',
            singer: 'Trung Quân',
            path: './assets/music/anh-tu-do-nhung-co-don.mp3',
            image: './assets/img/themaskedsinger.jpg',
        },
        {
            name: 'Có hẹn với thanh xuân',
            singer: 'Nhóm XHTDRLX2',
            path: './assets/music/CoHenVoiThanhXuan.mp3',
            image: './assets/img/forest-studio-moitinhdau.png',
        },
        {
            name: 'Past lives',
            singer: 'Sapientdream ',
            path: './assets/music/PastLives.mp3',
            image: './assets/img/PastLives.jpg',
        },
        {
            name: 'Lạnh lẽo',
            singer: 'Trương Bích Thần & Dương Tông Vỹ ',
            path: './assets/music/LanhLeo.mp3',
            image: './assets/img/LanhLeo.jpg',
        },

        {
            name: 'spiral',
            singer: 'LONGMAN',
            path: './assets/music/openingseason2mushokutensei.mp3',
            image: './assets/img/mushokutenseiseason2.jpg',
        },

        {
            name: 'Tabun',
            singer: 'YOASOBI',
            path: './assets/music/Tabun-YOASOBI-7098399.mp3',
            image: './assets/img/Tabun.webp',
        },


        {
            name: 'Tracing That Dream',
            singer: 'YOASOBI',
            path: './assets/music/TracingThatDream.mp3',
            image: './assets/img/tracingthatdream.webp',
        },

        {
            name: 'Monster',
            singer: 'YOASOBI',
            path: './assets/music/Monster-YOASOBI-7124847.mp3',
            image: './assets/img/monster.png',
        },

        {
            name: 'Idol',
            singer: 'YOASOBI',
            path: './assets/music/IdolOshiNoKoOpening-YOASOBI-9073746.mp3',
            image: './assets/img/idol.jpg',
        },

        {
            name: 'Đôi Lời',
            singer: 'Hoàng Dũng ',
            path: './assets/music/DoiLoi-HoangDung-5754832.mp3',
            image: './assets/img/Doi_Loi.jpg',
        },

        {
            name: 'Không cần thêm một ai nữa',
            singer: 'Mr.Siro ft BigDaddy',
            path: './assets/music/KhongCanThemMotAiNua.mp3',
            image: './assets/img/KhongCanThemMotAiNua.jpg',
        },


        {
            name: 'Bae, Kajima',
            singer: 'Undefined',
            path: './assets/music/baekajima.mp3',
            image: './assets/img/baekajima.jpg',
        },

        {
            name: 'Mùa Xuân Đầu Tiên',
            singer: 'Tama',
            path: './assets/music/MuaXuanDauTien-Tama.mp3',
            image: './assets/img/MuaXuanDauTien.jpg',
        },


        {
            name: 'Wellerman',
            singer: 'Nathan Evans ',
            path: './assets/music/wellerman-sea-shanty.mp3',
            image: './assets/img/Wellerman.jpg',
        },


        {
            name: 'Talking to the moon x Playdate',
            singer: 'Bruno Mars x Melanie Martinez',
            path: './assets/music/TalkingToTheMoonxPlayDate.mp3',
            image: './assets/img/TalkingToTheMoonxPlayDate.jpg',
        },


        {
            name: 'Buồn thì cứ khóc đi',
            singer: 'Trúc Nhân x Orange',
            path: './assets/music/BuonThiCuKhocDi.mp3',
            image: './assets/img/BuonThiCuKhocDi.jpg',
        },

        {
            name: 'Thức giấc',
            singer: ' Da LAB',
            path: './assets/music/ThucGiac-DaLAB-7048212.mp3',
            image: './assets/img/ThucGiac.jpg',
        },

        {
            name: 'No Internet',
            singer: '7UPPERCUTS, Seachains',
            path: './assets/music/NoInternet-7UPPERCUTSSeachains-6903538.mp3',
            image: './assets/img/nointernet.jpg',
        },
        
        


    ],
    render: function () {
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
                return this.songs[this.currentIndex] || this.songs[0]
            }
        })
    },
    handleEvents: function () {
        const _this = this
        const cdWidth = cd.offsetWidth
        // Xử lý CD quay / dừng 
        const cdThumbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)' }
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
            if ((e.which === 32 || e.which === 13) && !_this.isModal) {
                e.preventDefault()
                if (_this.isPlaying) {
                    audio.pause()
                }
                else {
                    audio.play()
                }

                // Khi bài hát được phát
                audio.onplay = function () {
                    _this.setConfig('currentIndex', _this.currentIndex)
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
            _this.setConfig('currentIndex', _this.currentIndex)
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
            if (audio.duration && !_this.isDraging) {
                _this.progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = _this.progressPercent
                progressValue.style.width = _this.progressPercent + '%'
                // Cập nhật phút của bài hát
                durationSong.textContent = _this.getTimeSong()
                currentTimeSong.textContent = _this.getTimeCurrentSong()
                _this.setConfig('currentTimeSong', audio.currentTime)
            }
        }


        // Xử lý isDraging

        progress.ontouchstart = function (e) {
            _this.isDraging = true
        }

        progress.ontouchend = function (e) {
            _this.isDraging = false
        }

        progress.onmousedown = function (e) {
            _this.isDraging = true
        }
        progress.onmouseup = function (e) {
            _this.isDraging = false
        }


        // Xử lý khi tua bài hát
        progress.onchange = function (e) {
            if (!_this.isDraging) {
                const seekTime = e.target.value * (audio.duration / 100);
                audio.currentTime = seekTime
            }
        }

        progress.oninput = function (e) {
            progressValue.style.width = e.target.value + '%'
            _this.currentTimeSeeking = Math.floor(e.target.value * audio.duration / 100)
            currentTimeSong.textContent = _this.getTimeSeeking()
            durationSong.textContent = _this.getTimeSong()
        }
        var songPlayed = [_this.currentIndex]
        function songsPlayed() {
            if (songPlayed.length < _this.songs.length - 1) {
                songPlayed.push(_this.currentIndex)
            }
            else {
                songPlayed = [_this.currentIndex];
            }
        }
        // Khi bấm vào nút chuyển đến bài hát kế tiếp
        nextBtn.onclick = function () {
            if (_this.isRandom) {
                do {
                    _this.randomSongs()
                    audio.play()

                } while (songPlayed.includes(_this.currentIndex))
            }
            else {
                _this.nextSong()
                audio.play()
            }
            songsPlayed()
            _this.scrollToActiveSong()

        }

        // Khi bấm vào nút chuyển về bài hát trước đó
        preBtn.onclick = function () {
            if (_this.isRandom) {
                do {
                    _this.randomSongs()
                    audio.play()

                } while (songPlayed.includes(_this.currentIndex))
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

                } while (songPlayed.includes(_this.currentIndex))
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

        // Xử lí khi bấm vào nút âm lượng 
        volumeIconOn.onclick = function () {
            _this.isMute = true
            audio.volume = 0
            volume.value = 0
            volumeValue.style.width = volume.value + '%'
            volumeWrap.classList.add('mute')
        }

        volumeIconOff.onclick = function () {
            _this.isMute = false
            audio.volume = _this.currentVolume / 100
            volume.value = _this.currentVolume
            volumeValue.style.width = volume.value + '%'
            volumeWrap.classList.remove('mute')
        }

        // Xử lí khi bấm vào chỉnh âm lượng bài hát 
        volume.oninput = function (e) {
            _this.currentVolume = e.target.value
            volumeValue.style.width = _this.currentVolume + '%';
            audio.volume = _this.currentVolume / 100
            audio.volume == 0 ? _this.isMute = true : _this.isMute = false
            // Xử lí trạng thái tắt âm 
            volumeWrap.classList.toggle('mute', _this.isMute)
        }

        // Xử lý khi bấm vào thêm bài hát

        addSong.onclick = () => {
            modal.classList.add('on')
            _this.isModal = true
        }

        overlay.onclick = () => {
            modal.classList.remove('on')
            _this.isModal = false
        }

        //  Lắng nghe hành vi chọn vào cả danh sách bài hát (thẻ cha)
        $('.playlist').onclick = function (e) {
            const songNode = e.target.closest('.song:not(.active')
            // Xử lý khi chọn để phát bài hát trong danh sách phát
            _this.preSong = _this.currentIndex
            if (songNode) {
                _this.currentIndex = Number(songNode.dataset.index)
                $(`#song-${_this.preSong}`).classList.remove('active')
                $(`#song-${_this.currentIndex}`).classList.add('active')
                _this.loadCurrenSongs()
                audio.play()
            }
        }
    },

    scrollToActiveSong: function () {
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior: "smooth",
                block: "end"
            })
        }, 300)
    },
    getTimeSeeking: function () {
        const timeSong = this.currentTimeSeeking;
        const minuteSong = Math.floor(timeSong / 60).toString().padStart(2, '0')
        const secondSong = Math.floor(timeSong - minuteSong * 60).toString().padStart(2, '0')
        return finnal = `${minuteSong} : ${secondSong}`
    },
    getTimeSong: function () {
        const timeSong = audio.duration;
        const minuteSong = Math.floor(timeSong / 60).toString().padStart(2, '0')
        const secondSong = Math.floor(timeSong - minuteSong * 60).toString().padStart(2, '0')
        return finnal = `${minuteSong} : ${secondSong}`
    },
    getTimeCurrentSong: function () {
        const timeSong = audio.currentTime;
        const minuteSong = Math.floor(timeSong / 60).toString().padStart(2, '0')
        const secondSong = Math.floor(timeSong - minuteSong * 60).toString().padStart(2, '0')
        return finnal = `${minuteSong} : ${secondSong}`
    },



    loadConfig: function () {
        this.isRandom = typeof this.config.isRandom == 'undefined' ? false : this.config.isRandom
        this.isRepeat = typeof this.config.isRepeat == 'undefined' ? false : this.config.isRepeat
        this.currentIndex = typeof this.config.currentIndex == 'undefined' ? 0 : this.config.currentIndex
        this.currentTimeSong = typeof this.config.currentTimeSong == 'undefined' ? 0 : this.config.currentTimeSong
    },

    loadCurrenSongs: function () {
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
    },

    nextSong: function () {
        this.currentIndex++
        this.preSong = this.currentIndex - 1;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0
            this.preSong = this.songs.length - 1;
        }
        $(`#song-${this.preSong}`).classList.remove('active')
        $(`#song-${this.currentIndex}`).classList.add('active')
        this.loadCurrenSongs()
    },
    backSong: function () {
        this.currentIndex--
        this.preSong = this.currentIndex + 1;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1
            this.preSong = 0
        }
        $(`#song-${this.preSong}`).classList.remove('active')
        $(`#song-${this.currentIndex}`).classList.add('active')
        this.loadCurrenSongs()
    },

    randomSongs: function () {
        const currentIndexSong = this.currentIndex;
        do {
            this.currentIndex = Math.floor(Math.random() * this.songs.length)
        }
        while (currentIndexSong === this.currentIndex)
        $(`#song-${currentIndexSong}`).classList.remove('active')
        $(`#song-${this.currentIndex}`).classList.add('active')
        this.loadCurrenSongs()
    },


    start: function () {
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
        // Tải lại tiến độ của bài hát trước đó 
        audio.currentTime = this.currentTimeSong
    },
}

app.start()