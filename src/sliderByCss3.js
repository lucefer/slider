;(function() {
    var options = {
        delay: '3s',
        transitionDuration: '2s',
        transitionTimeFunction: 'cubic-bezier(0.4,0,0,1)'
    }

    function setStyle(el, style) {
        for (var s in style) {
            el.style[s] = style[s]
        }
    }

    function createDom() {
        options.dom.style.position = 'relative'
        var box = options.dom.getBoundingClientRect()
        options.width = box.width
        options.height = box.height
        var domCreated = document.createDocumentFragment()
        var l = options.imgArr.length
        while (l--) {
            var img = document.createElement('img')
            img.src = options.imgArr[l]
            setStyle(img, {
                position: 'absolute',
                left: 0,
                top: 0,
                width: '100%',
                height: '100%'

            })

            slider.imgEles.push(img)
            domCreated.appendChild(img);

        }
        options.dom.appendChild(domCreated)
    }
    var slider = {
        config: function(opts) {
            for (var key in opts) {
                options[key] = opts[key];
            }
            this.init();
            return this
        },
        init: function() {
            var len = options.imgArr.length,
                l = len
            if (len <= 1) {
                return; }
            var i = 0;
            this.imgEles = []
            while (l--) {
                var img = new Image()
                img.onload = function() {
                    i++;
                    if (i == len) {
                        createDom();
                        this.start()
                    }
                }.bind(this)
                img.src = options.imgArr[l]
            }
        },

        start: function() {

            this.currIndex = this.currIndex || 0, len = this.imgEles.length
            transitionProp = 'transform ' + options.transitionDuration + ' ' + options.transitionTimeFunction + ' ' + options.delay
            setStyle(this.imgEles[this.currIndex], {
                transition: transitionProp,
                transform: 'translate(0,0)',
                zIndex: 10
            })
            this.nextIndex = this.currIndex == len - 1 ? 0 : (this.currIndex + 1)

            setStyle(this.imgEles[this.nextIndex], {
                transition: transitionProp,
                transform: 'translate(' + options.width + 'px,0)',
                zIndex: 10
            });

            var that = this;
            var aniCount = 0;
            var count = 0;
            that.imgEles.forEach(function(o) {
                o.addEventListener('transitionend', onEnd);
            })

            function onEnd() {
                aniCount++;
                if (aniCount < 2) {
                    return;
                }
                aniCount = 0;

                that.imgEles.forEach(function(o) {
                    o.style.zIndex = 0;
                });

                that.currIndex = that.nextIndex;
                that.nextIndex = that.currIndex == len - 1 ? 0 : that.currIndex + 1
                setStyle(that.imgEles[that.nextIndex], {
                    transition: '',
                    transform: 'translate(' + options.width + 'px,0)',
                    zIndex: 10
                })

                setStyle(that.imgEles[that.currIndex], {
                    transition: '',
                    transform: 'translate(0,0)',
                    zIndex: 10
                })
                console.log(that.currIndex + "," + that.nextIndex)



                that.imgEles[that.currIndex].offsetWidth


                setStyle(that.imgEles[that.nextIndex], {
                    transition: transitionProp,
                    transform: 'translate(0,0)'
                });

                setStyle(that.imgEles[that.currIndex], {
                    transition: transitionProp,
                    transform: 'translate(' + (-options.width) + 'px,0)'
                });

            }

            this.imgEles[this.currIndex].offsetWidth
            this.imgEles[this.currIndex].style.transform = 'translate(' + (-options.width) + 'px,0)'
            this.imgEles[this.nextIndex].style.transform = 'translate(0,0)';

            return this

        }
    }
     // umd expose
    if (typeof exports == "object") {
        module.exports = slider
    } else if (typeof define == "function" && define.amd) {
        define(function(){ return slider })
    } else {
        this.slider = slider
    }
})()
