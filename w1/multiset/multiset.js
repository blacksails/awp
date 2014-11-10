document.addEventListener("DOMContentLoaded", function() {
  function multiset() {
    
    this.entries = {};

    function entry(name, value) {
      this.name = name;
      this.value = value;
    }

    this.add = function(o, n) {
      var n = n || 1
      var h = o.hashCode();
      if (this.entries[h]) {
        this.entries[h].value += n;
      } else {
        var e = new entry(o, n);
        this.entries[h] = e;
      }
    }

    this.remove = function(o, n) {
      var n = n || 1
      var h = o.hashCode();
      if (this.entries[h]) {
        this.entries[h].value -= n;
        if (this.entries[h].value <= 0) {
          delete this.entries[h];
        }
      }
    }

    this.count = function(o) {
      var h = o.hashCode();
      return this.entries[h].value || 0
    }

    this.contains = function(o) {
      var h = o.hashCode();
      return !!this.entries[h];
    }

    this.toString = function() {
      var i = "  "
        var res = "{\n"
        for (var p in this.entries) {
          if (this.entries.hasOwnProperty(p)) {
            res += i + this.entries[p].name + ": " + this.entries[p].value + "\n"
          }
        }
      return res + "}\n"
    }
  }

  String.prototype.hashCode = function() {
    var hash = 0, i, chr, len;
    if (this.length == 0) return hash;
    for (i = 0, len = this.length; i < len; i++) {
      chr   = this.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }

  var set = new multiset();

  set.add("lol");
  set.add("lol");
  set.add("test");
  var add1 = document.getElementById("add1");
  add1.innerHTML = set.toString();
  
  set.remove("lol");
  set.remove("test");
  var remove1 = document.getElementById("remove1");
  remove1.innerHTML = set.toString();

  set.add("cheese");
  set.add("cheese");
  var c = document.getElementById("count");
  c.innerHTML = set.count("cheese") + "\n" + set.count("lol");

  var cont = document.getElementById("cont");
  cont.innerHTML = set.contains("cheese") + "\n" + set.contains("lol") + "\n" + set.contains("test");

  set.add("test",5);
  var add2 = document.getElementById("add2");
  add2.innerHTML = set.toString();

  set.remove("test", 6);
  var remove2 = document.getElementById("remove2");
  remove2.innerHTML = set.toString();
  
});
