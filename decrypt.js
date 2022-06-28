function decryptaes(i, handler, numsegment) {

    var e = function(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    };
    var t = function() {
            function e(e, t) {
                for (var i = 0; i < t.length; i++) {
                    var n = t[i];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                }
            }
            return function(t, i, n) {
                return i && e(t.prototype, i), n && e(t, n), t
            }
        }();
    function n(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        };
    function r() {
            var e = [
                    [
                        [],
                        [],
                        [],
                        [],
                        []
                    ],
                    [
                        [],
                        [],
                        [],
                        [],
                        []
                    ]
                ],
                t = e[0],
                i = e[1],
                n = t[4],
                r = i[4],
                a = void 0,
                s = void 0,
                o = void 0,
                u = [],
                l = [],
                c = void 0,
                h = void 0,
                d = void 0,
                p = void 0,
                f = void 0;
            for (a = 0; a < 256; a++) l[(u[a] = a << 1 ^ 283 * (a >> 7)) ^ a] = a;
            for (s = o = 0; !n[s]; s ^= c || 1, o = l[o] || 1)
                for (d = (d = o ^ o << 1 ^ o << 2 ^ o << 3 ^ o << 4) >> 8 ^ 255 & d ^ 99, n[s] = d, r[d] = s, f = 16843009 * u[h = u[c = u[s]]] ^ 65537 * h ^ 257 * c ^ 16843008 * s, p = 257 * u[d] ^ 16843008 * d, a = 0; a < 4; a++) t[a][s] = p = p << 24 ^ p >>> 8, i[a][d] = f = f << 24 ^ f >>> 8;
            for (a = 0; a < 5; a++) t[a] = t[a].slice(0), i[a] = i[a].slice(0);
            return e
        };
    var a = null;
    var s = function() {
            function t(i) {
                e(this, t), a || (a = r()), this._tables = [
                    [a[0][0].slice(), a[0][1].slice(), a[0][2].slice(), a[0][3].slice(), a[0][4].slice()],
                    [a[1][0].slice(), a[1][1].slice(), a[1][2].slice(), a[1][3].slice(), a[1][4].slice()]
                ];
                var n = void 0,
                    s = void 0,
                    o = void 0,
                    u = void 0,
                    l = void 0,
                    c = this._tables[0][4],
                    h = this._tables[1],
                    d = i.length,
                    p = 1;
                if (4 !== d && 6 !== d && 8 !== d) throw new Error("Invalid aes key size");
                for (u = i.slice(0), l = [], this._key = [u, l], n = d; n < 4 * d + 28; n++) o = u[n - 1], (n % d == 0 || 8 === d && n % d == 4) && (o = c[o >>> 24] << 24 ^ c[o >> 16 & 255] << 16 ^ c[o >> 8 & 255] << 8 ^ c[255 & o], n % d == 0 && (o = o << 8 ^ o >>> 24 ^ p << 24, p = p << 1 ^ 283 * (p >> 7))), u[n] = u[n - d] ^ o;
                for (s = 0; n; s++, n--) o = u[3 & s ? n : n - 4], l[s] = n <= 4 || s < 4 ? o : h[0][c[o >>> 24]] ^ h[1][c[o >> 16 & 255]] ^ h[2][c[o >> 8 & 255]] ^ h[3][c[255 & o]]
            }
            return t.prototype.decrypt = function(e, t, i, n, r, a) {
                var s = this._key[1],
                    o = e ^ s[0],
                    u = n ^ s[1],
                    l = i ^ s[2],
                    c = t ^ s[3],
                    h = void 0,
                    d = void 0,
                    p = void 0,
                    f = s.length / 4 - 2,
                    m = void 0,
                    g = 4,
                    y = this._tables[1],
                    v = y[0],
                    _ = y[1],
                    b = y[2],
                    T = y[3],
                    S = y[4];
                for (m = 0; m < f; m++) h = v[o >>> 24] ^ _[u >> 16 & 255] ^ b[l >> 8 & 255] ^ T[255 & c] ^ s[g], d = v[u >>> 24] ^ _[l >> 16 & 255] ^ b[c >> 8 & 255] ^ T[255 & o] ^ s[g + 1], p = v[l >>> 24] ^ _[c >> 16 & 255] ^ b[o >> 8 & 255] ^ T[255 & u] ^ s[g + 2], c = v[c >>> 24] ^ _[o >> 16 & 255] ^ b[u >> 8 & 255] ^ T[255 & l] ^ s[g + 3], g += 4, o = h, u = d, l = p;
                for (m = 0; m < 4; m++) r[(3 & -m) + a] = S[o >>> 24] << 24 ^ S[u >> 16 & 255] << 16 ^ S[l >> 8 & 255] << 8 ^ S[255 & c] ^ s[g++], h = o, o = u, u = l, l = c, c = h
            }, t
        }();
    var o = function() {
            function t() {
                e(this, t), this.listeners = {}
            }
            return t.prototype.on = function(e, t) {
                this.listeners[e] || (this.listeners[e] = []), this.listeners[e].push(t)
            }, t.prototype.off = function(e, t) {
                if (!this.listeners[e]) return !1;
                var i = this.listeners[e].indexOf(t);
                return this.listeners[e].splice(i, 1), i > -1
            }, t.prototype.trigger = function(e) {
                var t = this.listeners[e];
                if (t)
                    if (2 === arguments.length)
                        for (var i = t.length, n = 0; n < i; ++n) t[n].call(this, arguments[1]);
                    else
                        for (var r = Array.prototype.slice.call(arguments, 1), a = t.length, s = 0; s < a; ++s) t[s].apply(this, r)
            }, t.prototype.dispose = function() {
                this.listeners = {}
            }, t.prototype.pipe = function(e) {
                this.on("data", function(t) {
                    e.push(t)
                })
            }, t
        }();
    var u = function(t) {
            function i() {
                e(this, i);
                var r = n(this, t.call(this, o));
                return r.jobs = [], r.delay = 1, r.timeout_ = null, r
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }(i, t), i.prototype.processJob_ = function() {
                this.jobs.shift()(), this.jobs.length ? this.timeout_ = setTimeout(this.processJob_.bind(this), this.delay) : this.timeout_ = null
            }, i.prototype.push = function(e) {
                this.jobs.push(e), this.timeout_ || (this.timeout_ = setTimeout(this.processJob_.bind(this), this.delay))
            }, i
        }(o);
    var l = function(e) {
            return e << 24 | (65280 & e) << 8 | (16711680 & e) >> 8 | e >>> 24
        };
    var c = function() {
            function i(t, n, r, a) {
                e(this, i);
                var s = i.STEP,
                    o = new Int32Array(t.buffer),
                    c = new Uint8Array(t.byteLength),
                    h = 0;
                for (this.asyncStream_ = new u, this.asyncStream_.push(this.decryptChunk_(o.subarray(h, h + s), n, r, c)), h = s; h < o.length; h += s) r = new Uint32Array([l(o[h - 4]), l(o[h - 3]), l(o[h - 2]), l(o[h - 1])]), this.asyncStream_.push(this.decryptChunk_(o.subarray(h, h + s), n, r, c));

                this.asyncStream_.push(function() {
                    /* a((e = c).subarray(0, e.byteLength - e[e.byteLength - 1])) */
                    handler.on_segment_loaded(numsegment, (emit = c).subarray(0, emit.byteLength - emit[emit.byteLength - 1]));
                })
                
            }
            return i.prototype.decryptChunk_ = function(e, t, i, n) {
                return function() {
                    var r = function(e, t, i) {
                        var n = new Int32Array(e.buffer, e.byteOffset, e.byteLength >> 2),
                            r = new s(Array.prototype.slice.call(t)),
                            a = new Uint8Array(e.byteLength),
                            o = new Int32Array(a.buffer),
                            u = void 0,
                            c = void 0,
                            h = void 0,
                            d = void 0,
                            p = void 0,
                            f = void 0,
                            m = void 0,
                            g = void 0,
                            y = void 0;
                        for (u = i[0], c = i[1], h = i[2], d = i[3], y = 0; y < n.length; y += 4) p = l(n[y]), f = l(n[y + 1]), m = l(n[y + 2]), g = l(n[y + 3]), r.decrypt(p, f, m, g, o, y), o[y] = l(o[y] ^ u), o[y + 1] = l(o[y + 1] ^ c), o[y + 2] = l(o[y + 2] ^ h), o[y + 3] = l(o[y + 3] ^ d), u = p, c = f, h = m, d = g;
                        return a
                    }(e, t, i);
                    n.set(r, e.byteOffset)
                     
                }
            }, t(i, null, [{
                key: "STEP",
                get: function() {
                    return 32e3
                }
            }]), i
        }();
        
        return new c(i.encrypted, i.key, i.iv, function(n) {
        })
}
        

function decryptkey(a) {
    var u = new Uint8Array(a),
    l = [14, 22, 30, 38, 46, 54, 62];
    for ((c = new Uint8Array(64)).set(u.slice(6)), c.set(u.slice(7), 1), mt = 0; mt < l.length; mt++) c.set(u.slice(parseInt(l[mt])), parseInt(2 * mt + 2)), c.set(u.slice(parseInt(l[mt] + 1)), parseInt(2 * mt + 3));
    r = new DataView(c.buffer)
	return new Uint32Array([r.getUint32(0), r.getUint32(4), r.getUint32(8), r.getUint32(12)])
}

module.exports = {decryptaes, decryptkey}