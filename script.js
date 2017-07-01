const keys = {
  playeronekeys: {
    right: {
      isPressed: false,
      keyCode: 39,
    },
    up: {
      isPressed: false,
      keyCode: 38,
    },
    down: {
      isPressed: false,
      keyCode: 40,
    },
    left: {
      isPressed: false,
      keyCode: 37,
    },
  },
  playertwokeys: {
    g: {
      isPressed: false,
      keyCode: 71,
    },
    r: {
      isPressed: false,
      keyCode: 82,
    },
    f: {
      isPressed: false,
      keyCode: 70,
    },
    d: {
      isPressed: false,
      keyCode: 68,
    },
  },
};

let box = document.getElementById("box");
class tankmaker {
  constructor(name) {
    this.name = name;
    this.class = "players";
  }

  AddToHtml() {
    let tank = document.createElement("div");
    tank.setAttribute("id", this.name);
    tank.setAttribute("class", this.class + " " + this.name);
    box.appendChild(tank);
  }
}

function start() {
  $("#start").addClass("buttonzoomanimation").delay(900).queue(function() {
    $("#start").remove();
    startfirst();
  });
}

function startfirst() {
  let p1 = new tankmaker("player1");
  p1.AddToHtml();
  let p2 = new tankmaker("player2");
  p2.AddToHtml();
  let player1 = document.getElementById("player1");
  let player1jq = $("#player1");
  let player2 = document.getElementById("player2");
  let player2jq = $("#player2");
  let p1offset = $("#player1").offset();
  let p2offset = $("#player2").offset();
  let bodyjq = $("body");
  let p1img =
    "<img src='images/tankbody.png' class='tankbody'><div id='p1tankfirediv' class='tankfirediv'><img src='images/tankfire.png' class='p1tankfire'><div id='p1tankfiretop' class='tankfiretop'></div><div id='p1tankfirebottom' class='tankfirebottom'></div></div>";
  player1.innerHTML = p1img;
  let p2img =
    "<img src='images/tankbody.png' class='tankbody'><div id='p2tankfirediv' class='tankfirediv'><img src='images/tankfire.png' class='p2tankfire'><div id='p2tankfiretop' class='tankfiretop'></div><div id='p2tankfirebottom' class='tankfirebottom'></div></div>";
  player2.innerHTML = p2img;
  let xposp1 = 0;
  let yposp1 = p1offset.top;
  let xposp2 = 0;
  let yposp2 = p2offset.top;
  let speed = 1;
  let p1missileinair = false;
  let p2missileinair = false;
  let p2stillalive = true;
  let p1stillalive = true;
  let p1rotate = 0;
  let p1tankfirerotate = 0;
  let p2rotate = 0;
  let p2tankfirerotate = 0;
  let playergothit = new Audio("sounds/explosionsound.wav");
  let firesound = new Audio("sounds/fire.wav");

  setInterval(function() {
    document.onkeydown = function(event) {
      for (var key in keys.playeronekeys) {
        if (keys.playeronekeys[key].keyCode == event.keyCode) {
          keys.playeronekeys[key].isPressed = true;
        }
      }
      if (event.keyCode == 190) {
        p1fire();
      }

      if (event.keyCode == 188) {
        p1tankfirerotate -= 10;
        $("#p1tankfirediv").css({
          transform: "rotate(" + p1tankfirerotate + "deg)",
        });
      }

      if (event.keyCode == 191) {
        p1tankfirerotate += 10;
        $("#p1tankfirediv").css({
          transform: "rotate(" + p1tankfirerotate + "deg)",
        });
      }

      if (event.keyCode == 88) {
        p2fire();
      }

      if (event.keyCode == 90) {
        p2tankfirerotate -= 10;
        $("#p2tankfirediv").css({
          transform: "rotate(" + p2tankfirerotate + "deg)",
        });
      }

      if (event.keyCode == 67) {
        p2tankfirerotate += 10;
        $("#p2tankfirediv").css({
          transform: "rotate(" + p2tankfirerotate + "deg)",
        });
      }
      for (var key in keys.playertwokeys) {
        if (keys.playertwokeys[key].keyCode == event.keyCode) {
          keys.playertwokeys[key].isPressed = true;
        }
      }
    };

    for (var key in keys.playeronekeys) {
      if (keys.playeronekeys.right.isPressed) {
        if (
          $("#player1").offset().left + $("#player1").outerWidth(true) <
          $("body").outerWidth(true)
        ) {
          xposp1 -= speed;
          player1.style.right = xposp1 + "px";
        }
      }
      if (keys.playeronekeys.left.isPressed) {
        if ($("#player1").offset().left > $("body").offset().left) {
          xposp1 += speed;
          player1.style.right = xposp1 + "px";
        }
      }
      if (keys.playeronekeys.up.isPressed) {
        if ($("#player1").offset().top > $("body").offset().top) {
          yposp1 -= speed;
          player1.style.top = yposp1 + "px";
        }
      }
      if (keys.playeronekeys.down.isPressed) {
        if (
          $("#player1").offset().top + $("#player1").outerWidth(true) <
          $("body").outerHeight(true)
        ) {
          yposp1 += speed;
          player1.style.top = yposp1 + "px";
        }
      }

      if (
        keys.playeronekeys.up.isPressed &&
        keys.playeronekeys.right.isPressed
      ) {
        player1.style.transform = "rotate(45deg)";
        p1rotate = 45;
      } else if (
        keys.playeronekeys.up.isPressed &&
        keys.playeronekeys.left.isPressed
      ) {
        player1.style.transform = "rotate(315deg)";
        p1rotate = 315;
      } else if (
        keys.playeronekeys.down.isPressed &&
        keys.playeronekeys.left.isPressed
      ) {
        player1.style.transform = "rotate(225deg)";
        p1rotate = 225;
      } else if (
        keys.playeronekeys.down.isPressed &&
        keys.playeronekeys.right.isPressed
      ) {
        player1.style.transform = "rotate(135deg)";
        p1rotate = 135;
      } else if (keys.playeronekeys.right.isPressed) {
        player1.style.transform = "rotate(90deg)";
        p1rotate = 90;
      } else if (keys.playeronekeys.up.isPressed) {
        player1.style.transform = "rotate(0deg)";
        p1rotate = 0;
      } else if (keys.playeronekeys.down.isPressed) {
        player1.style.transform = "rotate(180deg)";
        p1rotate = 180;
      } else if (keys.playeronekeys.left.isPressed) {
        player1.style.transform = "rotate(270deg)";
        p1rotate = 270;
      }
    }

    for (var key in keys.playertwokeys) {
      if (keys.playertwokeys.g.isPressed) {
        if (
          $("#player2").offset().left + $("#player2").outerWidth(true) <
          $("body").outerWidth(true)
        ) {
          xposp2 += speed;
          player2.style.left = xposp2 + "px";
        }
      }
      if (keys.playertwokeys.d.isPressed) {
        if ($("#player2").offset().left > $("body").offset().left) {
          xposp2 -= speed;
          player2.style.left = xposp2 + "px";
        }
      }
      if (keys.playertwokeys.r.isPressed) {
        if ($("#player2").offset().top > $("body").offset().top) {
          yposp2 -= speed;
          player2.style.top = yposp2 + "px";
        }
      }
      if (keys.playertwokeys.f.isPressed) {
        if (
          $("#player2").offset().top + $("#player2").outerWidth(true) <
          $("body").outerHeight(true)
        ) {
          yposp2 += speed;
          player2.style.top = yposp2 + "px";
        }
      }

      if (keys.playertwokeys.r.isPressed && keys.playertwokeys.g.isPressed) {
        player2.style.transform = "rotate(45deg)";
        p2rotate = 45;
      } else if (
        keys.playertwokeys.r.isPressed &&
        keys.playertwokeys.d.isPressed
      ) {
        player2.style.transform = "rotate(315deg)";
        p2rotate = 315;
      } else if (
        keys.playertwokeys.f.isPressed &&
        keys.playertwokeys.d.isPressed
      ) {
        player2.style.transform = "rotate(225deg)";
        p2rotate = 225;
      } else if (
        keys.playertwokeys.f.isPressed &&
        keys.playertwokeys.g.isPressed
      ) {
        player2.style.transform = "rotate(135deg)";
        p2rotate = 135;
      } else if (keys.playertwokeys.g.isPressed) {
        player2.style.transform = "rotate(90deg)";
        p2rotate = 90;
      } else if (keys.playertwokeys.r.isPressed) {
        player2.style.transform = "rotate(0deg)";
        p2rotate = 0;
      } else if (keys.playertwokeys.f.isPressed) {
        player2.style.transform = "rotate(180deg)";
        p2rotate = 180;
      } else if (keys.playertwokeys.d.isPressed) {
        player2.style.transform = "rotate(270deg)";
        p2rotate = 270;
      }
    }

    document.onkeyup = function(event) {
      for (var key in keys.playeronekeys) {
        if (keys.playeronekeys[key].keyCode == event.keyCode) {
          keys.playeronekeys[key].isPressed = false;
        }
      }
      for (var key in keys.playertwokeys) {
        if (keys.playertwokeys[key].keyCode == event.keyCode) {
          keys.playertwokeys[key].isPressed = false;
        }
      }
    };
  }, 20);

  let p1fireallow = true;
  function p1fire() {
    if (p1fireallow && p1stillalive) {
      let player1offset = $("#player1").offset();
      let player1height = $("#player1").outerHeight(true);
      let player1width = $("#player1").outerWidth(true);
      let p1tankfireoffset = $(".p1tankfire").offset();
      let fire = document.createElement("div");
      fire.className = "missile p1missile p1newfire";

      fire.id = "p1missile";
      $("body").append(fire);

      $(".p1missile").offset({
        top:
          $("#p1tankfiretop").offset().top +
          $("#p1tankfiretop").outerHeight(true) / 2,
        left:
          $("#p1tankfiretop").offset().left +
          $("#p1tankfiretop").outerWidth(true) / 2,
      });

      let p1newfire = document.querySelector(".p1newfire");
      let p1yaxis = parseInt($(".p1missile").css("top"), 10);
      let p1xaxis = parseInt($(".p1missile").css("left"), 10);
      let p1missiletopleft = $("#p1tankfiretop").offset().left;
      let p1missiletoptop = $("#p1tankfiretop").offset().top;
      let p1missilebottomleft = $("#p1tankfirebottom").offset().left;
      let p1missilebottomtop = $("#p1tankfirebottom").offset().top;
      let p1xdiff = p1missiletopleft - p1missilebottomleft;
      let p1ydiff = p1missiletoptop - p1missilebottomtop;

      function fireanimationforp1() {
        p1yaxis += 1 + p1ydiff * 0.1;
        p1xaxis += 1 + p1xdiff * 0.1;
        p1newfire.style.top = p1yaxis + "px";
        p1newfire.style.left = p1xaxis + "px";
        requestAnimationFrame(fireanimationforp1);
      }
      fireanimationforp1();
      fire.className = "missile";
      fire.volume = 1;
      firesound.play();
      p1missileinair = true;
      p1fireallow = false;
    }

    setTimeout(function() {
      p1fireallow = true;
    }, 1000);
  }

  function p1checkhit() {
    let allp1missile = $("#p1missile");
    let p2width = $("#player2").outerWidth(true);
    let player2offset = $("#player2").offset();

    $(".missile").each(function(index, value) {
      let p1missileoffset = $(value).offset();
      let p1missilewidth = $(value).outerWidth(true);
      if (p1missileinair && p2stillalive) {
        if (
          (p1missileoffset.left == player2offset.left ||
            ((p1missileoffset.left >= player2offset.left ||
              p1missileoffset.left + p1missilewidth >= player2offset.left) &&
              p1missileoffset.left <= player2offset.left + p2width)) &&
          (p1missileoffset.top == player2offset.top ||
            (p1missileoffset.top + p1missilewidth >= player2offset.top &&
              p1missileoffset.top <= player2offset.top + p2width))
        ) {
          $("#player2")
            .hide(
              "explode",
              {
                pieces: 50,
              },
              2000
            )
            .remove();
          this.remove();
          p2stillalive = false;
          playergothit.volume = 1;
          playergothit.play();
        }
      }

      if (
        p1missileoffset.left >
          $("body").outerWidth(true) + $("body").offset().left ||
        p1missileoffset.top >
          $("body").outerHeight(true) + $("body").offset().top ||
        p1missileoffset.top < $("body").offset().top - p1missilewidth ||
        p1missileoffset.left < $("body").offset().left - p1missilewidth
      ) {
        this.remove();
      }
    });
  }

  setInterval(function() {
    p1checkhit();
  }, 1);

  let p2fireallow = true;
  function p2fire() {
    if (p2fireallow && p2stillalive) {
      let player2offset = $("#player2").offset();
      let player2height = $("#player2").outerHeight(true);
      let player2width = $("#player2").outerWidth(true);
      let p2tankfireoffset = $(".p2tankfire").offset();
      let fire = document.createElement("div");
      fire.className = "missile p2missile p2newfire";
      fire.id = "p2missile";
      $("body").append(fire);
      $(".p2missile").offset({
        top:
          $("#p2tankfiretop").offset().top +
          $("#p2tankfiretop").outerHeight(true) / 2,
        left:
          $("#p2tankfiretop").offset().left +
          $("#p2tankfiretop").outerWidth(true) / 2,
      });

      let p2newfire = document.querySelector(".p2newfire");
      let p2yaxis = parseInt($(".p2missile").css("top"), 10);
      let p2xaxis = parseInt($(".p2missile").css("left"), 10);
      let p2missiletopleft = $("#p2tankfiretop").offset().left;
      let p2missiletoptop = $("#p2tankfiretop").offset().top;
      let p2missilebottomleft = $("#p2tankfirebottom").offset().left;
      let p2missilebottomtop = $("#p2tankfirebottom").offset().top;
      let p2xdiff = p2missiletopleft - p2missilebottomleft;
      let p2ydiff = p2missiletoptop - p2missilebottomtop;

      function fireanimationforp2() {
        p2yaxis += 1 + p2ydiff * 0.1;
        p2xaxis += 1 + p2xdiff * 0.1;
        p2newfire.style.top = p2yaxis + "px";
        p2newfire.style.left = p2xaxis + "px";
        requestAnimationFrame(fireanimationforp2);
      }

      fireanimationforp2();
      fire.className = "missile";
      fire.volume = 1;
      firesound.play();
      p2missileinair = true;
      p2fireallow = false;
    }

    setTimeout(function() {
      p2fireallow = true;
    }, 1000);
  }

  function p2checkhit() {
    let allp2missile = $("#p2missile");
    let p1width = $("#player1").outerWidth(true);
    let player1offset = $("#player1").offset();

    $(".missile").each(function(index, value) {
      let p2missileoffset = $(value).offset();
      let p2missilewidth = $(value).outerWidth(true);
      if (p2missileinair && p1stillalive) {
        if (
          (p2missileoffset.left == player1offset.left ||
            ((p2missileoffset.left >= player1offset.left ||
              p2missileoffset.left + p2missilewidth >= player1offset.left) &&
              p2missileoffset.left <= player1offset.left + p1width)) &&
          (p2missileoffset.top == player1offset.top ||
            (p2missileoffset.top + p2missilewidth >= player1offset.top &&
              p2missileoffset.top <= player1offset.top + p1width))
        ) {
          $("#player1")
            .hide(
              "explode",
              {
                pieces: 50,
              },
              2000
            )
            .remove();
          this.remove();
          p1stillalive = false;
          playergothit.volume = 1;
          playergothit.play();
        }
      }

      if (
        p2missileoffset.left >
          $("body").outerWidth(true) + $("body").offset().left ||
        p2missileoffset.top >
          $("body").outerHeight(true) + $("body").offset().top ||
        p2missileoffset.top < $("body").offset().top - p2missilewidth ||
        p2missileoffset.left < $("body").offset().left - p2missilewidth
      ) {
        this.remove();
      }
    });
  }

  setInterval(function() {
    p2checkhit();
  }, 1);
}
