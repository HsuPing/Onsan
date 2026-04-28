const I18N = {
  zh: {
    'page.title.index': '温啓源紀念',
    'page.title.memorial': '紀念禮拜｜温啓源紀念',
    'page.title.gallery': '相簿｜温啓源紀念',

    'brand': '温啓源紀念',

    'nav.home': '首頁',
    'nav.memorial': '紀念禮拜',
    'nav.gallery': '相簿',
    'nav.business': '事業',

    'lang.toggle': '日本語',

    'hero.motto': '幫人難處　記人好處　識人長處',
    'hero.epitaph': '願他在天上依然開朗喜樂，<br>即使話多，也不再有人對他說「稍微安靜一點」。<br>或許此刻，他正熱情地與新朋友開心交談分享笑聲。',

    'card.memorial.title': '紀念禮拜',
    'card.memorial.body': '2026 年 4 月 30 日<br>告別禮拜程序與生平略歷',
    'card.gallery.title': '相簿',
    'card.gallery.body': '家族與朋友之間<br>那些笑聲不斷的時光',
    'card.rw.body': '羅多瓦恰三佑國際有限公司<br>汽車 A 柱盲區專利產品',
    'card.fb.body': '到 Facebook 留言、追思<br>與分享你和啓源的回憶',

    'footer.line1': '謹以此網站，懷念  温啓源弟兄',

    'memorial.title': '主內故 温啓源弟兄告別禮拜',
    'memorial.date': '主後 2026 年 4 月 30 日　上午 9:00',
    'memorial.location': '台北市立懷愛館景行樓 1 樓至忠 4 廳',

    'section.encoffin': '入殮禮拜',
    'section.farewell': '告別禮拜',
    'section.thanks': '家屬謝詞',
    'section.bio': '生平略歷',
    'section.cremation': '火化禮拜',
    'section.burial': '安葬禮拜',

    'gallery.h1': '相簿',
    'gallery.subtitle.prefix': '共 ',
    'gallery.subtitle.suffix': ' 張照片　·　點擊放大瀏覽',
    'gallery.section.all': '所有照片',
  },

  ja: {
    'page.title.index': '温啓源 追悼',
    'page.title.memorial': '追悼礼拝｜温啓源 追悼',
    'page.title.gallery': 'アルバム｜温啓源 追悼',

    'brand': '温啓源 追悼',

    'nav.home': 'ホーム',
    'nav.memorial': '追悼礼拝',
    'nav.gallery': 'アルバム',
    'nav.business': '事業',

    'lang.toggle': '中文',

    'hero.motto': '人の難を助け、人の恩を覚え、人の長所を知る',
    'hero.epitaph': '天国でおしゃべりしすぎて、神様に「少し静かにしなさい」と<br>言われませんように。<br>きっと今頃も、天で新しい仲間を見つけては<br>話しかけていることでしょう。',

    'card.memorial.title': '追悼礼拝',
    'card.memorial.body': '2026年4月30日<br>追悼礼拝のプログラムと略歴',
    'card.gallery.title': 'アルバム',
    'card.gallery.body': '家族や友人と<br>笑い声の絶えなかったひととき',
    'card.rw.body': 'ロドワチャ三佑国際有限公司<br>車のAピラー死角特許製品',
    'card.fb.body': 'Facebookでメッセージを残し<br>啓源との思い出を共有してください',

    'footer.line1': 'このサイトを以て、温啓源兄弟を偲びます',

    'memorial.title': '主にあって 故 温啓源兄弟 告別礼拝',
    'memorial.date': '2026年4月30日（主後）午前9:00',
    'memorial.location': '台北市立懐愛館 景行楼1階 至忠4ホール',

    'section.encoffin': '納棺礼拝',
    'section.farewell': '告別礼拝',
    'section.thanks': '遺族謝辞',
    'section.bio': '略歴',
    'section.cremation': '火葬礼拝',
    'section.burial': '埋葬礼拝',

    'gallery.h1': 'アルバム',
    'gallery.subtitle.prefix': '全 ',
    'gallery.subtitle.suffix': ' 枚　·　クリックで拡大',
    'gallery.section.all': 'すべての写真',
  },
};

(function () {
  function applyLang(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var val = I18N[lang][key];
      if (val !== undefined) {
        if (el.hasAttribute('data-i18n-html')) {
          el.innerHTML = val;
        } else {
          el.textContent = val;
        }
      }
    });
    try { localStorage.setItem('lang', lang); } catch (e) {}
  }

  function init() {
    var saved = 'zh';
    try { saved = localStorage.getItem('lang') || 'zh'; } catch (e) {}
    if (saved !== 'zh' && saved !== 'ja') saved = 'zh';
    applyLang(saved);

    document.querySelectorAll('.lang-toggle').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        var cur = document.documentElement.lang || 'zh';
        applyLang(cur === 'ja' ? 'zh' : 'ja');
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
