(() => {
  var b = self.Ultraviolet,
    F = self.UVClient,
    V = self.__uv$config,
    p = self.__uv$bareData,
    g = self.__uv$bareURL,
    M = self.__uv$cookies;
  if (typeof p != "object" || typeof g != "string" || typeof M != "string")
    throw new TypeError("Unable to load global UV data");
  self.__uv || y(self);
  self.__uvHook = y;
  function y(o) {
    if ("__uv" in o && o.__uv instanceof b) return !1;
    o.document &&
      o.window &&
      o.document
        .querySelectorAll("script[__uv-script]")
        .forEach((t) => t.remove());
    let E = !o.window,
      _ = "__uv",
      s = "__uv$",
      e = new b(V),
      x = WebSocket,
      a = new F(o),
      {
        HTMLMediaElement: f,
        HTMLScriptElement: S,
        HTMLAudioElement: O,
        HTMLVideoElement: j,
        HTMLInputElement: L,
        HTMLEmbedElement: T,
        HTMLTrackElement: H,
        HTMLAnchorElement: $,
        HTMLIFrameElement: d,
        HTMLAreaElement: W,
        HTMLLinkElement: C,
        HTMLBaseElement: A,
        HTMLFormElement: R,
        HTMLImageElement: P,
        HTMLSourceElement: D,
      } = o;
    a.nativeMethods.defineProperty(o, "__uv", { value: e, enumerable: !1 }),
      (e.meta.origin = location.origin),
      (e.location = a.location.emulate(
        (t) =>
          t === "about:srcdoc"
            ? new URL(t)
            : (t.startsWith("blob:") && (t = t.slice(5)),
              new URL(e.sourceUrl(t))),
        (t) => e.rewriteUrl(t)
      ));
    let c = M;
    (e.meta.url = e.location),
      (e.domain = e.meta.url.host),
      (e.blobUrls = new o.Map()),
      (e.referrer = ""),
      (e.cookies = []),
      (e.localStorageObj = {}),
      (e.sessionStorageObj = {});
    let k = new b.BareClient();
    if (
      ((e.bareClient = k),
      e.location.href === "about:srcdoc" && (e.meta = o.parent.__uv.meta),
      o.EventTarget &&
        ((e.addEventListener = o.EventTarget.prototype.addEventListener),
        (e.removeListener = o.EventTarget.prototype.removeListener),
        (e.dispatchEvent = o.EventTarget.prototype.dispatchEvent)),
      a.nativeMethods.defineProperty(a.storage.storeProto, "__uv$storageObj", {
        get() {
          if (this === a.storage.sessionStorage) return e.sessionStorageObj;
          if (this === a.storage.localStorage) return e.localStorageObj;
        },
        enumerable: !1,
      }),
      o.localStorage)
    ) {
      for (let t in o.localStorage)
        t.startsWith(s + e.location.origin + "@") &&
          (e.localStorageObj[t.slice((s + e.location.origin + "@").length)] =
            o.localStorage.getItem(t));
      e.lsWrap = a.storage.emulate(a.storage.localStorage, e.localStorageObj);
    }
    if (o.sessionStorage) {
      for (let t in o.sessionStorage)
        t.startsWith(s + e.location.origin + "@") &&
          (e.sessionStorageObj[t.slice((s + e.location.origin + "@").length)] =
            o.sessionStorage.getItem(t));
      e.ssWrap = a.storage.emulate(
        a.storage.sessionStorage,
        e.sessionStorageObj
      );
    }
    let m = o.document ? a.node.baseURI.get.call(o.document) : o.location.href,
      U = e.sourceUrl(m);
    a.nativeMethods.defineProperty(e.meta, "base", {
      get() {
        return o.document
          ? (a.node.baseURI.get.call(o.document) !== m &&
              ((m = a.node.baseURI.get.call(o.document)), (U = e.sourceUrl(m))),
            U)
          : e.meta.url.href;
      },
    }),
      (e.methods = {
        setSource: s + "setSource",
        source: s + "source",
        location: s + "location",
        function: s + "function",
        string: s + "string",
        eval: s + "eval",
        parent: s + "parent",
        top: s + "top",
      }),
      (e.filterKeys = [
        _,
        e.methods.setSource,
        e.methods.source,
        e.methods.location,
        e.methods.function,
        e.methods.string,
        e.methods.eval,
        e.methods.parent,
        e.methods.top,
        s + "protocol",
        s + "storageObj",
        s + "url",
        s + "modifiedStyle",
        s + "config",
        s + "dispatched",
        "Ultraviolet",
        "__uvHook",
      ]),
      a.on("wrap", (t, r) => {
        a.nativeMethods.defineProperty(
          r,
          "name",
          a.nativeMethods.getOwnPropertyDescriptor(t, "name")
        ),
          a.nativeMethods.defineProperty(
            r,
            "length",
            a.nativeMethods.getOwnPropertyDescriptor(t, "length")
          ),
          a.nativeMethods.defineProperty(r, e.methods.string, {
            enumerable: !1,
            value: a.nativeMethods.fnToString.call(t),
          }),
          a.nativeMethods.defineProperty(r, e.methods.function, {
            enumerable: !1,
            value: t,
          });
      }),
      a.fetch.on("request", (t) => {
        t.data.input = e.rewriteUrl(t.data.input);
      }),
      a.fetch.on("requestUrl", (t) => {
        t.data.value = e.sourceUrl(t.data.value);
      }),
      a.fetch.on("responseUrl", (t) => {
        t.data.value = e.sourceUrl(t.data.value);
      }),
      a.xhr.on("open", (t) => {
        t.data.input = e.rewriteUrl(t.data.input);
      }),
      a.xhr.on("responseUrl", (t) => {
        t.data.value = e.sourceUrl(t.data.value);
      }),
      a.workers.on("worker", (t) => {
        t.data.url = e.rewriteUrl(t.data.url);
      }),
      a.workers.on("addModule", (t) => {
        t.data.url = e.rewriteUrl(t.data.url);
      }),
      a.workers.on("importScripts", (t) => {
        for (let r in t.data.scripts)
          t.data.scripts[r] = e.rewriteUrl(t.data.scripts[r]);
      }),
      a.workers.on("postMessage", (t) => {
        let r = t.data.origin;
        (t.data.origin = "*"),
          (t.data.message = {
            __data: t.data.message,
            __origin: e.meta.url.origin,
            __to: r,
          });
      }),
      a.navigator.on("sendBeacon", (t) => {
        t.data.url = e.rewriteUrl(t.data.url);
      }),
      a.document.on("getCookie", (t) => {
        t.data.value = c;
      }),
      a.document.on("setCookie", (t) => {
        e.cookie.db().then((i) => {
          e.cookie.setCookies(t.data.value, i, e.meta),
            e.cookie.getCookies(i).then((l) => {
              c = e.cookie.serialize(l, e.meta, !0);
            });
        });
        let r = e.cookie.setCookie(t.data.value)[0];
        r.path || (r.path = "/"),
          r.domain || (r.domain = e.meta.url.hostname),
          e.cookie.validateCookie(r, e.meta, !0) &&
            (c.length && (c += "; "), (c += `${r.name}=${r.value}`)),
          t.respondWith(t.data.value);
      }),
      a.element.on("setInnerHTML", (t) => {
        switch (t.that.tagName) {
          case "SCRIPT":
            t.data.value = e.js.rewrite(t.data.value);
            break;
          case "STYLE":
            t.data.value = e.rewriteCSS(t.data.value);
            break;
          default:
            t.data.value = e.rewriteHtml(t.data.value);
        }
      }),
      a.element.on("getInnerHTML", (t) => {
        switch (t.that.tagName) {
          case "SCRIPT":
            t.data.value = e.js.source(t.data.value);
            break;
          default:
            t.data.value = e.sourceHtml(t.data.value);
        }
      }),
      a.element.on("setOuterHTML", (t) => {
        t.data.value = e.rewriteHtml(t.data.value, {
          document: t.that.tagName === "HTML",
        });
      }),
      a.element.on("getOuterHTML", (t) => {
        switch (t.that.tagName) {
          case "HEAD":
            t.data.value = e
              .sourceHtml(
                t.data.value.replace(
                  /<head(.*)>(.*)<\/head>/s,
                  "<op-head$1>$2</op-head>"
                )
              )
              .replace(/<op-head(.*)>(.*)<\/op-head>/s, "<head$1>$2</head>");
            break;
          case "BODY":
            t.data.value = e
              .sourceHtml(
                t.data.value.replace(
                  /<body(.*)>(.*)<\/body>/s,
                  "<op-body$1>$2</op-body>"
                )
              )
              .replace(/<op-body(.*)>(.*)<\/op-body>/s, "<body$1>$2</body>");
            break;
          default:
            t.data.value = e.sourceHtml(t.data.value, {
              document: t.that.tagName === "HTML",
            });
            break;
        }
      }),
      a.document.on("write", (t) => {
        if (!t.data.html.length) return !1;
        t.data.html = [e.rewriteHtml(t.data.html.join(""))];
      }),
      a.document.on("writeln", (t) => {
        if (!t.data.html.length) return !1;
        t.data.html = [e.rewriteHtml(t.data.html.join(""))];
      }),
      a.element.on("insertAdjacentHTML", (t) => {
        t.data.html = e.rewriteHtml(t.data.html);
      }),
      a.eventSource.on("construct", (t) => {
        t.data.url = e.rewriteUrl(t.data.url);
      }),
      a.eventSource.on("url", (t) => {
        t.data.url = e.rewriteUrl(t.data.url);
      }),
      a.idb.on("idbFactoryOpen", (t) => {
        t.data.name !== "__op" &&
          (t.data.name = `${e.meta.url.origin}@${t.data.name}`);
      }),
      a.idb.on("idbFactoryName", (t) => {
        t.data.value = t.data.value.slice(e.meta.url.origin.length + 1);
      }),
      a.history.on("replaceState", (t) => {
        t.data.url &&
          (t.data.url = e.rewriteUrl(
            t.data.url,
            "__uv" in t.that ? t.that.__uv.meta : e.meta
          ));
      }),
      a.history.on("pushState", (t) => {
        t.data.url &&
          (t.data.url = e.rewriteUrl(
            t.data.url,
            "__uv" in t.that ? t.that.__uv.meta : e.meta
          ));
      }),
      a.element.on("getAttribute", (t) => {
        a.element.hasAttribute.call(
          t.that,
          e.attributePrefix + "-attr-" + t.data.name
        ) &&
          t.respondWith(
            t.target.call(t.that, e.attributePrefix + "-attr-" + t.data.name)
          );
      }),
      a.message.on("postMessage", (t) => {
        let r = t.data.origin,
          i = e.call;
        t.that && (i = t.that.__uv$source.call),
          (t.data.origin = "*"),
          (t.data.message = {
            __data: t.data.message,
            __origin: (t.that || t.target).__uv$source.location.origin,
            __to: r,
          }),
          t.respondWith(
            E
              ? i(t.target, [t.data.message, t.data.transfer], t.that)
              : i(
                  t.target,
                  [t.data.message, t.data.origin, t.data.transfer],
                  t.that
                )
          );
      }),
      a.message.on("data", (t) => {
        let { value: r } = t.data;
        typeof r == "object" &&
          "__data" in r &&
          "__origin" in r &&
          t.respondWith(r.__data);
      }),
      a.message.on("origin", (t) => {
        let r = a.message.messageData.get.call(t.that);
        typeof r == "object" &&
          r.__data &&
          r.__origin &&
          t.respondWith(r.__origin);
      }),
      a.overrideDescriptor(o, "origin", { get: () => e.location.origin }),
      a.node.on("baseURI", (t) => {
        t.data.value.startsWith(o.location.origin) &&
          (t.data.value = e.sourceUrl(t.data.value));
      }),
      a.element.on("setAttribute", (t) => {
        if (
          t.that instanceof f &&
          t.data.name === "src" &&
          t.data.value.startsWith("blob:")
        ) {
          t.target.call(
            t.that,
            e.attributePrefix + "-attr-" + t.data.name,
            t.data.value
          ),
            (t.data.value = e.blobUrls.get(t.data.value));
          return;
        }
        e.attrs.isUrl(t.data.name) &&
          (t.target.call(
            t.that,
            e.attributePrefix + "-attr-" + t.data.name,
            t.data.value
          ),
          (t.data.value = e.rewriteUrl(t.data.value))),
          e.attrs.isStyle(t.data.name) &&
            (t.target.call(
              t.that,
              e.attributePrefix + "-attr-" + t.data.name,
              t.data.value
            ),
            (t.data.value = e.rewriteCSS(t.data.value, {
              context: "declarationList",
            }))),
          e.attrs.isHtml(t.data.name) &&
            (t.target.call(
              t.that,
              e.attributePrefix + "-attr-" + t.data.name,
              t.data.value
            ),
            (t.data.value = e.rewriteHtml(t.data.value, {
              ...e.meta,
              document: !0,
              injectHead: e.createHtmlInject(
                e.handlerScript,
                e.bundleScript,
                e.clientScript,
                e.configScript,
                g,
                p,
                c,
                o.location.href
              ),
            }))),
          e.attrs.isSrcset(t.data.name) &&
            (t.target.call(
              t.that,
              e.attributePrefix + "-attr-" + t.data.name,
              t.data.value
            ),
            (t.data.value = e.html.wrapSrcset(t.data.value.toString()))),
          e.attrs.isForbidden(t.data.name) &&
            (t.data.name = e.attributePrefix + "-attr-" + t.data.name);
      }),
      a.element.on("audio", (t) => {
        t.data.url = e.rewriteUrl(t.data.url);
      }),
      a.element.hookProperty([$, W, C, A], "href", {
        get: (t, r) => e.sourceUrl(t.call(r)),
        set: (t, r, [i]) => {
          a.element.setAttribute.call(r, e.attributePrefix + "-attr-href", i),
            t.call(r, e.rewriteUrl(i));
        },
      }),
      a.element.hookProperty([S, O, j, f, P, L, T, d, H, D], "src", {
        get: (t, r) => e.sourceUrl(t.call(r)),
        set: (t, r, [i]) => {
          if (
            new String(i).toString().trim().startsWith("blob:") &&
            r instanceof f
          )
            return (
              a.element.setAttribute.call(
                r,
                e.attributePrefix + "-attr-src",
                i
              ),
              t.call(r, e.blobUrls.get(i) || i)
            );
          a.element.setAttribute.call(r, e.attributePrefix + "-attr-src", i),
            t.call(r, e.rewriteUrl(i));
        },
      }),
      a.element.hookProperty([R], "action", {
        get: (t, r) => e.sourceUrl(t.call(r)),
        set: (t, r, [i]) => {
          a.element.setAttribute.call(r, e.attributePrefix + "-attr-action", i),
            t.call(r, e.rewriteUrl(i));
        },
      }),
      a.element.hookProperty([P], "srcset", {
        get: (t, r) =>
          a.element.getAttribute.call(r, e.attributePrefix + "-attr-srcset") ||
          t.call(r),
        set: (t, r, [i]) => {
          a.element.setAttribute.call(r, e.attributePrefix + "-attr-srcset", i),
            t.call(r, e.html.wrapSrcset(i.toString()));
        },
      }),
      a.element.hookProperty(S, "integrity", {
        get: (t, r) =>
          a.element.getAttribute.call(r, e.attributePrefix + "-attr-integrity"),
        set: (t, r, [i]) => {
          a.element.setAttribute.call(
            r,
            e.attributePrefix + "-attr-integrity",
            i
          );
        },
      }),
      a.element.hookProperty(d, "sandbox", {
        get: (t, r) =>
          a.element.getAttribute.call(r, e.attributePrefix + "-attr-sandbox") ||
          t.call(r),
        set: (t, r, [i]) => {
          a.element.setAttribute.call(
            r,
            e.attributePrefix + "-attr-sandbox",
            i
          );
        },
      });
    let I =
      d && Object.getOwnPropertyDescriptor(d.prototype, "contentWindow").get;
    function v(t) {
      let r = I.call(t);
      if (!r.__uv)
        try {
          y(r);
        } catch (i) {
          console.error("catastrophic failure"), console.error(i);
        }
    }
    a.element.hookProperty(d, "contentWindow", {
      get: (t, r) => (v(r), t.call(r)),
    }),
      a.element.hookProperty(d, "contentDocument", {
        get: (t, r) => (v(r), t.call(r)),
      }),
      a.element.hookProperty(d, "srcdoc", {
        get: (t, r) =>
          a.element.getAttribute.call(r, e.attributePrefix + "-attr-srcdoc") ||
          t.call(r),
        set: (t, r, [i]) => {
          t.call(
            r,
            e.rewriteHtml(i, {
              document: !0,
              injectHead: e.createHtmlInject(
                e.handlerScript,
                e.bundleScript,
                e.clientScript,
                e.configScript,
                g,
                p,
                c,
                o.location.href
              ),
            })
          );
        },
      }),
      a.node.on("getTextContent", (t) => {
        t.that.tagName === "SCRIPT" &&
          (t.data.value = e.js.source(t.data.value));
      }),
      a.node.on("setTextContent", (t) => {
        t.that.tagName === "SCRIPT" &&
          (t.data.value = e.js.rewrite(t.data.value));
      }),
      "serviceWorker" in o.navigator &&
        delete o.Navigator.prototype.serviceWorker,
      a.document.on("getDomain", (t) => {
        t.data.value = e.domain;
      }),
      a.document.on("setDomain", (t) => {
        if (
          !t.data.value
            .toString()
            .endsWith(e.meta.url.hostname.split(".").slice(-2).join("."))
        )
          return t.respondWith("");
        t.respondWith((e.domain = t.data.value));
      }),
      a.document.on("url", (t) => {
        t.data.value = e.location.href;
      }),
      a.document.on("documentURI", (t) => {
        t.data.value = e.location.href;
      }),
      a.document.on("referrer", (t) => {
        t.data.value = e.referrer || e.sourceUrl(t.data.value);
      }),
      a.document.on("parseFromString", (t) => {
        if (t.data.type !== "text/html") return !1;
        t.data.string = e.rewriteHtml(t.data.string, {
          ...e.meta,
          document: !0,
        });
      }),
      a.attribute.on("getValue", (t) => {
        a.element.hasAttribute.call(
          t.that.ownerElement,
          e.attributePrefix + "-attr-" + t.data.name
        ) &&
          (t.data.value = a.element.getAttribute.call(
            t.that.ownerElement,
            e.attributePrefix + "-attr-" + t.data.name
          ));
      }),
      a.attribute.on("setValue", (t) => {
        e.attrs.isUrl(t.data.name) &&
          (a.element.setAttribute.call(
            t.that.ownerElement,
            e.attributePrefix + "-attr-" + t.data.name,
            t.data.value
          ),
          (t.data.value = e.rewriteUrl(t.data.value))),
          e.attrs.isStyle(t.data.name) &&
            (a.element.setAttribute.call(
              t.that.ownerElement,
              e.attributePrefix + "-attr-" + t.data.name,
              t.data.value
            ),
            (t.data.value = e.rewriteCSS(t.data.value, {
              context: "declarationList",
            }))),
          e.attrs.isHtml(t.data.name) &&
            (a.element.setAttribute.call(
              t.that.ownerElement,
              e.attributePrefix + "-attr-" + t.data.name,
              t.data.value
            ),
            (t.data.value = e.rewriteHtml(t.data.value, {
              ...e.meta,
              document: !0,
              injectHead: e.createHtmlInject(
                e.handlerScript,
                e.bundleScript,
                e.clientScript,
                e.configScript,
                g,
                p,
                c,
                o.location.href
              ),
            }))),
          e.attrs.isSrcset(t.data.name) &&
            (a.element.setAttribute.call(
              t.that.ownerElement,
              e.attributePrefix + "-attr-" + t.data.name,
              t.data.value
            ),
            (t.data.value = e.html.wrapSrcset(t.data.value.toString())));
      }),
      a.url.on("createObjectURL", (t) => {
        let r = t.target.call(t.that, t.data.object);
        if (r.startsWith("blob:" + location.origin)) {
          let i =
            "blob:" +
            (e.meta.url.href !== "about:blank"
              ? e.meta.url.origin
              : o.parent.__uv.meta.url.origin) +
            r.slice(5 + location.origin.length);
          e.blobUrls.set(i, r), t.respondWith(i);
        } else t.respondWith(r);
      }),
      a.url.on("revokeObjectURL", (t) => {
        if (e.blobUrls.has(t.data.url)) {
          let r = t.data.url;
          (t.data.url = e.blobUrls.get(t.data.url)), e.blobUrls.delete(r);
        }
      }),
      a.storage.on("get", (t) => {
        t.data.name = s + e.meta.url.origin + "@" + t.data.name;
      }),
      a.storage.on("set", (t) => {
        t.that.__uv$storageObj &&
          (t.that.__uv$storageObj[t.data.name] = t.data.value),
          (t.data.name = s + e.meta.url.origin + "@" + t.data.name);
      }),
      a.storage.on("delete", (t) => {
        t.that.__uv$storageObj && delete t.that.__uv$storageObj[t.data.name],
          (t.data.name = s + e.meta.url.origin + "@" + t.data.name);
      }),
      a.storage.on("getItem", (t) => {
        t.data.name = s + e.meta.url.origin + "@" + t.data.name;
      }),
      a.storage.on("setItem", (t) => {
        t.that.__uv$storageObj &&
          (t.that.__uv$storageObj[t.data.name] = t.data.value),
          (t.data.name = s + e.meta.url.origin + "@" + t.data.name);
      }),
      a.storage.on("removeItem", (t) => {
        t.that.__uv$storageObj && delete t.that.__uv$storageObj[t.data.name],
          (t.data.name = s + e.meta.url.origin + "@" + t.data.name);
      }),
      a.storage.on("clear", (t) => {
        if (t.that.__uv$storageObj)
          for (let r of a.nativeMethods.keys.call(null, t.that.__uv$storageObj))
            delete t.that.__uv$storageObj[r],
              a.storage.removeItem.call(
                t.that,
                s + e.meta.url.origin + "@" + r
              ),
              t.respondWith();
      }),
      a.storage.on("length", (t) => {
        t.that.__uv$storageObj &&
          t.respondWith(
            a.nativeMethods.keys.call(null, t.that.__uv$storageObj).length
          );
      }),
      a.storage.on("key", (t) => {
        t.that.__uv$storageObj &&
          t.respondWith(
            a.nativeMethods.keys.call(null, t.that.__uv$storageObj)[
              t.data.index
            ] || null
          );
      });
    function h(t, r) {
      let i = `on${r}`,
        l = new WeakMap();
      Reflect.defineProperty(t, i, {
        enumerable: !0,
        configurable: !0,
        get() {
          return l.has(this) ? l.get(this) : null;
        },
        set(n) {
          typeof n == "function" &&
            (l.has(this) && this.removeEventListener(r, l.get(this)),
            l.set(this, n),
            this.addEventListener(r, n));
        },
      });
    }
    let N = ["ws:", "wss:"];
    class u extends EventTarget {
      #t;
      #a;
      #e = "blob";
      #i = "";
      #l = "";
      #r = "";
      async #o(r, i) {
        let l = {};
        Reflect.setPrototypeOf(l, null),
          (l.Origin = e.meta.url.origin),
          (l["User-Agent"] = navigator.userAgent),
          c !== "" && (l.Cookie = c.toString()),
          (this.#t = await k.createWebSocket(r, i, x, l)),
          (this.#t.binaryType = this.#e),
          this.#t.addEventListener("message", (n) => {
            this.dispatchEvent(new MessageEvent("message", n));
          }),
          this.#t.addEventListener("open", async (n) => {
            this.dispatchEvent(new Event("open", n));
          }),
          this.#t.addEventListener("error", (n) => {
            this.dispatchEvent(new ErrorEvent("error", n));
          }),
          this.#t.addEventListener("close", (n) => {
            this.dispatchEvent(new Event("close", n));
          });
      }
      get url() {
        return this.#r;
      }
      constructor(...r) {
        if ((super(), !r.length))
          throw new DOMException(
            "Failed to construct 'WebSocket': 1 argument required, but only 0 present."
          );
        let [i, l] = r,
          n;
        try {
          n = new URL(i);
        } catch {
          throw new DOMException(
            `Faiiled to construct 'WebSocket': The URL '${i}' is invalid.`
          );
        }
        if (!N.includes(n.protocol))
          throw new DOMException(
            `Failed to construct 'WebSocket': The URL's scheme must be either 'ws' or 'wss'. '${n.protocol}' is not allowed.`
          );
        this.#a = this.#o(n, l);
      }
      get protocol() {
        return this.#t.protocol;
      }
      get extensions() {
        return this.#t.extensions;
      }
      get readyState() {
        return this.#t ? this.#t.readyState : u.CONNECTING;
      }
      get binaryType() {
        return this.#e;
      }
      set binaryType(r) {
        (this.#e = r), this.#t && (this.#t.binaryType = r);
      }
      send(r) {
        if (!this.#t)
          throw new DOMException(
            "Failed to execute 'send' on 'WebSocket': Still in CONNECTING state."
          );
        this.#t.send(r);
      }
      close(r, i) {
        if (
          typeof r < "u" &&
          (typeof r != "number" && (r = 0), r !== 1e3 && (r < 3e3 || r > 4999))
        )
          throw new DOMException(
            `Failed to execute 'close' on 'WebSocket': The code must be either 1000, or between 3000 and 4999. ${r} is neither.`
          );
        this.#a.then(() => this.#t.close(r, i));
      }
    }
    h(u.prototype, "close"),
      h(u.prototype, "open"),
      h(u.prototype, "message"),
      h(u.prototype, "error");
    for (let t of [
      "url",
      "protocol",
      "extensions",
      "readyState",
      "binaryType",
    ]) {
      let r = Object.getOwnPropertyDescriptor(o.WebSocket.prototype, t),
        i = Object.getOwnPropertyDescriptor(u.prototype, t);
      i?.get && r?.get && a.emit("wrap", i.get, r.get),
        i?.set && r?.set && a.emit("wrap", i.get, r.get);
    }
    if (
      (a.emit("wrap", o.WebSocket.prototype.send, u.prototype.send),
      a.emit("wrap", o.WebSocket.prototype.close, u.prototype.close),
      a.override(o, "WebSocket", (t, r, i) => new u(...i), !0),
      (u.prototype.constructor = o.WebSocket),
      a.function.on("function", (t) => {
        t.data.script = e.rewriteJS(t.data.script);
      }),
      a.function.on("toString", (t) => {
        e.methods.string in t.that && t.respondWith(t.that[e.methods.string]);
      }),
      a.object.on("getOwnPropertyNames", (t) => {
        t.data.names = t.data.names.filter((r) => !e.filterKeys.includes(r));
      }),
      a.object.on("getOwnPropertyDescriptors", (t) => {
        for (let r of e.filterKeys) delete t.data.descriptors[r];
      }),
      a.style.on("setProperty", (t) => {
        a.style.dashedUrlProps.includes(t.data.property) &&
          (t.data.value = e.rewriteCSS(t.data.value, {
            context: "value",
            ...e.meta,
          }));
      }),
      a.style.on("getPropertyValue", (t) => {
        a.style.dashedUrlProps.includes(t.data.property) &&
          t.respondWith(
            e.sourceCSS(t.target.call(t.that, t.data.property), {
              context: "value",
              ...e.meta,
            })
          );
      }),
      "CSS2Properties" in o)
    )
      for (let t of a.style.urlProps)
        a.overrideDescriptor(o.CSS2Properties.prototype, t, {
          get: (r, i) =>
            e.sourceCSS(r.call(i), { context: "value", ...e.meta }),
          set: (r, i, l) => {
            r.call(i, e.rewriteCSS(l, { context: "value", ...e.meta }));
          },
        });
    else
      "HTMLElement" in o &&
        a.overrideDescriptor(o.HTMLElement.prototype, "style", {
          get: (t, r) => {
            let i = t.call(r);
            if (!i[s + "modifiedStyle"])
              for (let l of a.style.urlProps)
                a.nativeMethods.defineProperty(i, l, {
                  enumerable: !0,
                  configurable: !0,
                  get() {
                    let n = a.style.getPropertyValue.call(this, l) || "";
                    return e.sourceCSS(n, { context: "value", ...e.meta });
                  },
                  set(n) {
                    a.style.setProperty.call(
                      this,
                      a.style.propToDashed[l] || l,
                      e.rewriteCSS(n, { context: "value", ...e.meta })
                    );
                  },
                }),
                  a.nativeMethods.defineProperty(i, s + "modifiedStyle", {
                    enumerable: !1,
                    value: !0,
                  });
            return i;
          },
        });
    a.style.on("setCssText", (t) => {
      t.data.value = e.rewriteCSS(t.data.value, {
        context: "declarationList",
        ...e.meta,
      });
    }),
      a.style.on("getCssText", (t) => {
        t.data.value = e.sourceCSS(t.data.value, {
          context: "declarationList",
          ...e.meta,
        });
      }),
      e.addEventListener.call(o, "hashchange", (t) => {
        if (t.__uv$dispatched) return !1;
        t.stopImmediatePropagation();
        let r = o.location.hash;
        a.history.replaceState.call(o.history, "", "", t.oldURL),
          (e.location.hash = r);
      }),
      a.location.on("hashchange", (t, r, i) => {
        if (i.HashChangeEvent && a.history.replaceState) {
          a.history.replaceState.call(o.history, "", "", e.rewriteUrl(r));
          let l = new i.HashChangeEvent("hashchange", { newURL: r, oldURL: t });
          a.nativeMethods.defineProperty(l, s + "dispatched", {
            value: !0,
            enumerable: !1,
          }),
            e.dispatchEvent.call(o, l);
        }
      }),
      a.fetch.overrideRequest(),
      a.fetch.overrideUrl(),
      a.xhr.overrideOpen(),
      a.xhr.overrideResponseUrl(),
      a.element.overrideHtml(),
      a.element.overrideAttribute(),
      a.element.overrideInsertAdjacentHTML(),
      a.element.overrideAudio(),
      a.node.overrideBaseURI(),
      a.node.overrideTextContent(),
      a.attribute.overrideNameValue(),
      a.document.overrideDomain(),
      a.document.overrideURL(),
      a.document.overrideDocumentURI(),
      a.document.overrideWrite(),
      a.document.overrideReferrer(),
      a.document.overrideParseFromString(),
      a.storage.overrideMethods(),
      a.storage.overrideLength(),
      a.object.overrideGetPropertyNames(),
      a.object.overrideGetOwnPropertyDescriptors(),
      a.idb.overrideName(),
      a.idb.overrideOpen(),
      a.history.overridePushState(),
      a.history.overrideReplaceState(),
      a.eventSource.overrideConstruct(),
      a.eventSource.overrideUrl(),
      a.url.overrideObjectURL(),
      a.document.overrideCookie(),
      a.message.overridePostMessage(),
      a.message.overrideMessageOrigin(),
      a.message.overrideMessageData(),
      a.workers.overrideWorker(),
      a.workers.overrideAddModule(),
      a.workers.overrideImportScripts(),
      a.workers.overridePostMessage(),
      a.style.overrideSetGetProperty(),
      a.style.overrideCssText(),
      a.navigator.overrideSendBeacon(),
      a.function.overrideFunction(),
      a.function.overrideToString(),
      a.location.overrideWorkerLocation((t) => new URL(e.sourceUrl(t))),
      a.overrideDescriptor(o, "localStorage", {
        get: (t, r) => (r || o).__uv.lsWrap,
      }),
      a.overrideDescriptor(o, "sessionStorage", {
        get: (t, r) => (r || o).__uv.ssWrap,
      }),
      a.override(o, "open", (t, r, i) => {
        if (!i.length) return t.apply(r, i);
        let [l] = i;
        return (l = e.rewriteUrl(l)), t.call(r, l);
      }),
      (e.$wrap = function (t) {
        return t === "location"
          ? e.methods.location
          : t === "eval"
          ? e.methods.eval
          : t;
      }),
      (e.$get = function (t) {
        return t === o.location
          ? e.location
          : t === o.eval
          ? e.eval
          : t === o.parent
          ? o.__uv$parent
          : t === o.top
          ? o.__uv$top
          : t;
      }),
      (e.eval = a.wrap(o, "eval", (t, r, i) => {
        if (!i.length || typeof i[0] != "string") return t.apply(r, i);
        let [l] = i;
        return (l = e.rewriteJS(l)), t.call(r, l);
      })),
      (e.call = function (t, r, i) {
        return i ? t.apply(i, r) : t(...r);
      }),
      (e.call$ = function (t, r, i = []) {
        return t[r].apply(t, i);
      }),
      a.nativeMethods.defineProperty(o.Object.prototype, _, {
        get: () => e,
        enumerable: !1,
      }),
      a.nativeMethods.defineProperty(o.Object.prototype, e.methods.setSource, {
        value: function (t) {
          return a.nativeMethods.isExtensible(this)
            ? (a.nativeMethods.defineProperty(this, e.methods.source, {
                value: t,
                writable: !0,
                enumerable: !1,
              }),
              this)
            : this;
        },
        enumerable: !1,
      }),
      a.nativeMethods.defineProperty(o.Object.prototype, e.methods.source, {
        value: e,
        writable: !0,
        enumerable: !1,
      }),
      a.nativeMethods.defineProperty(o.Object.prototype, e.methods.location, {
        configurable: !0,
        get() {
          return this === o.document || this === o ? e.location : this.location;
        },
        set(t) {
          this === o.document || this === o
            ? (e.location.href = t)
            : (this.location = t);
        },
      }),
      a.nativeMethods.defineProperty(o.Object.prototype, e.methods.parent, {
        configurable: !0,
        get() {
          let t = this.parent;
          if (this === o)
            try {
              return "__uv" in t ? t : this;
            } catch {
              return this;
            }
          return t;
        },
        set(t) {
          this.parent = t;
        },
      }),
      a.nativeMethods.defineProperty(o.Object.prototype, e.methods.top, {
        configurable: !0,
        get() {
          let t = this.top;
          if (this === o) {
            if (t === this.parent) return this[e.methods.parent];
            try {
              if ("__uv" in t) return t;
              {
                let r = this;
                for (; r.parent !== t; ) r = r.parent;
                return "__uv" in r ? r : this;
              }
            } catch {
              return this;
            }
          }
          return t;
        },
        set(t) {
          this.top = t;
        },
      }),
      a.nativeMethods.defineProperty(o.Object.prototype, e.methods.eval, {
        configurable: !0,
        get() {
          return this === o ? e.eval : this.eval;
        },
        set(t) {
          this.eval = t;
        },
      });
  }
})();
//# sourceMappingURL=uv.handler.js.map