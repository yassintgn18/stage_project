var CRUMINA = {};
!(function (e) {
    "use strict";
    var t = e(document),
        i = e("body"),
        a = e(".pie-chart"),
        n = e(".crumina-skills-item"),
        s = e(".main-content-wrapper"),
        r = e(".top-bar");
    e(".back-to-top").on("click", function () {
        return e("html,body").animate({ scrollTop: 0 }, 1200), !1;
    }),
        (CRUMINA.Swiper = {
            $swipers: {},
            init: function () {
                var t = this;
                e(".swiper-container").each(function (i) {
                    var a = e(this),
                        n = "swiper-unique-id-" + i;
                    a.addClass(n + " initialized").attr("id", n),
                        a
                            .closest(".crumina-module")
                            .find(".swiper-pagination")
                            .addClass("pagination-" + n),
                        (t.$swipers[n] = new Swiper("#" + n, t.getParams(a, n))),
                        t.addEventListeners(t.$swipers[n]);
                });
            },
            getParams: function (e, t) {
                var i = {
                    parallax: !0,
                    breakpoints: !1,
                    keyboardControl: !0,
                    setWrapperSize: !0,
                    preloadImages: !0,
                    updateOnImagesReady: !0,
                    prevNext: !!e.data("prev-next") && e.data("prev-next"),
                    changeHandler: e.data("change-handler") ? e.data("change-handler") : "",
                    direction: e.data("direction") ? e.data("direction") : "horizontal",
                    mousewheel: !!e.data("mouse-scroll") && { releaseOnEdges: !0 },
                    slidesPerView: e.data("show-items") ? e.data("show-items") : 1,
                    slidesPerGroup: e.data("scroll-items") ? e.data("scroll-items") : 1,
                    spaceBetween: e.data("space-between") || 0 == e.data("space-between") ? e.data("space-between") : 20,
                    centeredSlides: !!e.data("centered-slider") && e.data("centered-slider"),
                    autoplay: !!e.data("autoplay") && { delay: parseInt(e.data("autoplay")) },
                    autoHeight: !!e.hasClass("auto-height"),
                    loop: 0 != e.data("loop") || e.data("loop"),
                    effect: e.data("effect") ? e.data("effect") : "slide",
                    pagination: { type: e.data("pagination") ? e.data("pagination") : "bullets", el: ".pagination-" + t, clickable: !0 },
                    coverflow: { stretch: e.data("stretch") ? e.data("stretch") : 0, depth: e.data("depth") ? e.data("depth") : 0, slideShadows: !1, rotate: 0, modifier: 2 },
                    fade: { crossFade: !e.data("crossfade") || e.data("crossfade") },
                };
                return i.slidesPerView > 1 && (i.breakpoints = { 320: { slidesPerView: 1, slidesPerGroup: 1 }, 580: { slidesPerView: 2, slidesPerGroup: 2 }, 769: { slidesPerView: i.slidesPerView, slidesPerGroup: i.slidesPerView } }), i;
            },
            addEventListeners: function (t) {
                var i = this,
                    a = t.$el.closest(".crumina-module-slider");
                t.params.prevNext &&
                    a.on("click", ".swiper-btn-next, .swiper-btn-prev", function (i) {
                        i.preventDefault(), e(this).hasClass("swiper-btn-next") ? t.slideNext() : t.slidePrev();
                    }),
                    a.on("click", ".slider-slides .slides-item", function (i) {
                        i.preventDefault();
                        var a = e(this);
                        t.params.loop ? t.slideToLoop(a.index()) : t.slideTo(a.index());
                    }),
                    a.on("click", ".time-line-slides .slides-item", function (n) {
                        n.preventDefault();
                        var s = e(this);
                        i.changes.timeLine(t, a, i, s.index());
                    }),
                    t.on("slideChange", function () {
                        var e = i.changes[t.params.changeHandler];
                        "function" == typeof e && e(t, a, i, this.realIndex);
                    });
            },
            changes: {
                thumbsParent: function (e, t) {
                    var i = t.find(".slider-slides .slides-item");
                    i.removeClass("swiper-slide-active"), i.eq(e.realIndex).addClass("swiper-slide-active");
                },
                timeParent: function (e, t, i, a) {
                    var n = t.find(".swiper-time-line").attr("id"),
                        s = i.$swipers[n];
                    s.slideTo(a), i.changes.timeLine(s, t, i, a);
                },
                timeLine: function (e, t, i, a) {
                    var n = e.$el.find(".swiper-slide"),
                        s = n.eq(a);
                    s.hasClass("time-active") || (n.removeClass("time-active"), s.addClass("time-active").removeClass("visited"), s.prevAll(".swiper-slide").addClass("visited"), s.nextAll(".swiper-slide").removeClass("visited"));
                },
            },
        }),
        (CRUMINA.resizeSwiper = function (t) {
            var i = (t = t || e(this)[0].swiper).slides.eq(t.activeIndex).find("> *").outerHeight(),
                a = e(t.container).find(".slider-slides"),
                n = a.length ? a.height() : 0;
            if (e(t.container).hasClass("pagination-vertical")) {
                var s = t.slides
                        .map(function () {
                            return e(this).find("> *").height();
                        })
                        .get(),
                    r = Math.max.apply(Math, s);
                t.container.css({ height: r + "px" }), t.update(!0);
            }
            n > 0 && (t.container.css("paddingBottom", n + "px"), t.onResize()), e(t.container).hasClass("auto-height") && ((t = t || e(this)[0].swiper).container.css({ height: i + "px" }), t.onResize()), CRUMINA.mainSliderHeight();
        }),
        (CRUMINA.mainSliderHeight = function () {
            setTimeout(function () {
                e(".swiper-container.js-full-window").each(function () {
                    var t = e(this),
                        i = t.find(".main-slider-slides"),
                        a = i.length ? i.height() : 0,
                        n = e(window).height(),
                        r = s.offset().top;
                    e(".main-slider .container")
                        .imagesLoaded()
                        .done(function () {
                            e(".main-slider .container").outerHeight() > n - a - r
                                ? (t.css("min-height", "auto").css("height", "auto"), t.find("> .swiper-wrapper").css("min-height", "auto").css("height", "auto"))
                                : (t.css("min-height", n - r + "px").css("height", n - r + "px"),
                                  t
                                      .find("> .swiper-wrapper")
                                      .css("min-height", n - a - r + "px")
                                      .css("height", n - a - r + "px"));
                        });
                });
            }, 300);
        }),
        (CRUMINA.pieCharts = function () {
            a.length &&
                a.each(function () {
                    e(this).waypoint(
                        function () {
                            let t = e(this.element),
                                i = t.data("start-color"),
                                a = t.data("end-color"),
                                n = 100 * t.data("value");
                            t
                                .circleProgress({ thickness: 16, size: 320, startAngle: (-Math.PI / 4) * 2, emptyFill: "#fff", lineCap: "round", fill: { gradient: [i, a], gradientAngle: Math.PI / 4 } })
                                .on("circle-animation-progress", function (e, i) {
                                    t.find(".content").html(parseInt(n * i, 10) + "<span>%</span>");
                                })
                                .on("circle-animation-end", function () {}),
                                this.destroy();
                        },
                        { offset: "90%" }
                    );
                });
        }),
        (CRUMINA.progresBars = function () {
            n.length &&
                n.each(function () {
                    e(this).waypoint(
                        function () {
                            e(this.element).find(".skills-item-meter-active").fadeTo(300, 1).addClass("skills-animate"), this.destroy();
                        },
                        { offset: "90%" }
                    );
                });
        }),
        e(".quantity-plus").on("click", function () {
            let t = parseInt(e(this).prev("input").val());
            return (
                e(this)
                    .prev("input")
                    .val(t + 1)
                    .change(),
                !1
            );
        }),
        e(".quantity-minus").on("click", function () {
            let t = parseInt(e(this).next("input").val());
            return (
                1 !== t &&
                    e(this)
                        .next("input")
                        .val(t - 1)
                        .change(),
                !1
            );
        }),
        (CRUMINA.select2Init = function () {
            e(".crumina--select").select2();
        }),
        (CRUMINA.customScroll = function () {
            e(".mCustomScrollbar").length && e(".mCustomScrollbar").perfectScrollbar({ wheelPropagation: !1 });
        }),
        (CRUMINA.toggleBar = function () {
            return r.toggleClass("open"), i.toggleClass("overlay-enable"), !1;
        }),
        e(".top-bar-link").on("click", function () {
            CRUMINA.toggleBar();
        }),
        e(".top-bar-close").on("click", function () {
            CRUMINA.toggleBar();
        }),
        (CRUMINA.counters = function () {
            e(".counter-value").each(function () {
                const t = e(this);
                t.waypoint(
                    function () {
                        let e = t.data("count"),
                            i = t.data("duration") ? t.data("duration") : 2e3;
                        anime({ targets: this.element, innerHTML: e, easing: "linear", round: 1, duration: i });
                        this.destroy();
                    },
                    { offset: "100%" }
                );
            });
        }),
        (CRUMINA.animateSignature = function () {
            e(".js-animate-icon").each(function () {
                var t = e(this);
                t.waypoint(
                    function () {
                        anime({
                            targets: "path",
                            strokeDashoffset: [anime.setDashoffset, 0],
                            easing: "easeInOutCubic",
                            duration: 1500,
                            delay: 300,
                            opacity: 1,
                            begin: function (e) {
                                var i,
                                    a = t.find("path");
                                for (i = 0; i < a.length; ++i) a[i].setAttribute("stroke", "currentColor"), a[i].setAttribute("fill", "none");
                            },
                        }),
                            this.destroy();
                    },
                    { offset: "100%" }
                );
            });
        }),
        (CRUMINA.bootestrapHelper = function () {
            e("#popup-search").on("shown.bs.modal", function () {
                e(".search-popup-input").trigger("focus");
            });
        }),
        (CRUMINA.masonryLayout = function () {
            if (e(".grid").length) {
                var t = e(".grid").masonry({ itemSelector: ".grid-item" });
                t.imagesLoaded().progress(function () {
                    t.masonry("layout");
                });
            }
        }),
        (CRUMINA.animateSection = function () {
            e(window).innerWidth() > 600
                ? e(".section-anime-js").each(function () {
                      var t = e(this);
                      t.waypoint(
                          function () {
                              for (var e = new Array(), i = t.find(".element-anime-fadeInUp-js"), a = 0; a < i.length; a++) e.push(i[a]);
                              var n = new Array(),
                                  s = t.find(".element-anime-opacity-js");
                              for (a = 0; a < s.length; a++) n.push(s[a]);
                              anime
                                  .timeline({ easing: "easeOutCirc", duration: 1e3 })
                                  .add({ targets: t[0], opacity: 1 })
                                  .add({ targets: e, translateY: [150, 0], duration: 500, opacity: 1, delay: anime.stagger(100) }, "-=750")
                                  .add({ targets: n, duration: 1e3, opacity: 1, delay: anime.stagger(70) }),
                                  this.destroy();
                          },
                          { offset: "80%" }
                      );
                  })
                : e(".section-anime-js").each(function () {
                      var t = e(this);
                      t.waypoint(
                          function () {
                              for (var e = new Array(), i = t.find(".element-anime-fadeInUp-js"), a = 0; a < i.length; a++) e.push(i[a]);
                              var n = new Array(),
                                  s = t.find(".element-anime-opacity-js");
                              for (a = 0; a < s.length; a++) n.push(s[a]);
                              anime
                                  .timeline({ easing: "easeOutCirc", duration: 500 })
                                  .add({ targets: t[0], opacity: 1 })
                                  .add({ targets: e, translateY: [150, 0], duration: 500, opacity: 1, delay: anime.stagger(500) }, "-=750")
                                  .add({ targets: n, duration: 1e3, opacity: 1, delay: anime.stagger(70) }),
                                  this.destroy();
                          },
                          { offset: "90%" }
                      );
                  });
        }),
        t.ready(function () {
            CRUMINA.select2Init(),
                CRUMINA.customScroll(),
                CRUMINA.pieCharts(),
                CRUMINA.progresBars(),
                CRUMINA.counters(),
                CRUMINA.Swiper.init(),
                CRUMINA.mainSliderHeight(),
                CRUMINA.animateSignature(),
                CRUMINA.bootestrapHelper(),
                CRUMINA.masonryLayout(),
                CRUMINA.animateSection();
        }),
        e(window).on("resize", function () {
            setTimeout(function () {
                CRUMINA.mainSliderHeight();
            }, 300);
        });
})(jQuery);
