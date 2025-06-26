'use client';
import { useEffect } from 'react';
import { Block } from 'shared/ui/block';
import './GosuslugiWidget.scss';

export const GosuslugiWidget = () => {
  useEffect(() => {
    const Widget = (src: string, opaId: number, isFz59 = false) => {
      const ACTION_ID = 'js-show-iframe-wrapper';
      const BLOCK_ACTION_CLASS = 'pos-block-action';

      const fz59 = isFz59 ? 'true' : 'false';
      src += `?opaId=${opaId}&fz59=${fz59}`;

      const div = document.createElement('div');
      const header = document.createElement('header');
      const overlay = document.createElement('div');
      const body = document.body;

      // Styling
      Object.assign(div.style, {
        background: 'white',
        position: 'fixed',
        maxWidth: '620px',
        maxHeight: '768px',
        margin: 'auto',
        top: '0',
        bottom: '0',
        left: '0',
        right: '0',
        zIndex: '999999999',
      });

      Object.assign(overlay.style, {
        position: 'fixed',
        zIndex: '999999998',
        width: '100%',
        height: '100%',
        top: '0',
        left: '0',
        backgroundColor: 'rgba(0,0,0,.3)',
      });

      div.id = 'js-iframe-wrapper';
      overlay.id = 'js-iframe-overlay';

      const iframe = document.createElement('iframe');
      Object.assign(iframe.style, {
        width: '100%',
        height: '100%',
        border: '0',
      });
      iframe.src = src;
      iframe.id = 'js-iframe-widget';
      iframe.referrerPolicy = 'unsafe-url';

      div.appendChild(iframe);
      header.innerHTML = 'Новое обращение';

      const destroy = () => {
        document.getElementById('js-iframe-overlay')?.remove();
        document.getElementById('js-iframe-wrapper')?.remove();
      };

      const create = () => {
        body.appendChild(div);
        body.appendChild(overlay);
      };

      const openWidgetBtn = document.getElementById(ACTION_ID);
      if (openWidgetBtn) {
        openWidgetBtn.addEventListener('click', (e) => {
          e.preventDefault();
          create();
        });

        openWidgetBtn.addEventListener('touchend', () => {
          if (!openWidgetBtn.classList.contains(BLOCK_ACTION_CLASS)) {
            create();
          } else {
            setTimeout(() => {
              openWidgetBtn.classList.remove(BLOCK_ACTION_CLASS);
            }, 0);
          }
        });

        openWidgetBtn.addEventListener('touchmove', () => {
          openWidgetBtn.classList.add(BLOCK_ACTION_CLASS);
        });
      }

      window.addEventListener('message', (event) => {
        if (event.data?.close) {
          destroy();
        }
      });

      // Слоган и кнопка
      const overrideSlogan = () => {
        const posBanner = document.getElementById(ACTION_ID);
        if (!posBanner) return;

        const sloganTag =
          posBanner.querySelector('.bf-1__slogan') || posBanner.querySelector('.bf-2__slogan');

        const posButton =
          posBanner.querySelector('.bf-1 .pos-banner-btn_2') ||
          posBanner.querySelector('.bf-2 .pos-banner-btn_2');

        if (sloganTag) sloganTag.innerHTML = 'Решаем вместе';
        if (posButton) {
          (posButton as HTMLElement).innerHTML = 'Сообщить о проблеме';
          (posButton as HTMLElement).style.width = '240px';
        }
      };

      overrideSlogan();
    };

    // Стили баннера при изменении размеров
    const POS_PREFIX_17 = '--pos-banner-fluid-17__';
    const posOptionsInitialBanner17 = {
      background: '#ffffff',
      'grid-template-columns': '100%',
      'grid-template-rows': '188px auto',
      'max-width': '100%',
      'text-font-size': '24px',
      'text-margin': '0 0 24px 0',
      'button-wrap-max-width': '100%',
      'bg-url': "url('https://pos.gosuslugi.ru/bin/banner-fluid/6/banner-fluid-bg-6.svg')",
      'bg-url-position': 'center bottom',
      'bg-size': 'contain',
      'content-padding': '24px',
      'content-grid-row': '0',
      'logo-width': '65px',
      'logo-wrap-top': '16px',
      'logo-wrap-right': '13px',
      'slogan-font-size': '12px',
    };

    const setStyles = (styles: Record<string, string>, el: HTMLElement) => {
      for (const key in styles) {
        el.style.setProperty(`${POS_PREFIX_17}${key}`, styles[key]);
      }
    };

    const removeStyles = (styles: Record<string, string>, el: HTMLElement) => {
      for (const key in styles) {
        el.style.removeProperty(`${POS_PREFIX_17}${key}`);
      }
    };

    const changePosBannerOnResize = () => {
      const el = document.documentElement;
      const t = { ...posOptionsInitialBanner17 };
      const wrapper = document.getElementById('js-show-iframe-wrapper');
      const r = wrapper ? wrapper.offsetWidth : document.body.offsetWidth;

      if (r > 340) {
        t['grid-template-rows'] = '236px auto';
        t['bg-url'] = "url('https://pos.gosuslugi.ru/bin/banner-fluid/6/banner-fluid-bg-6-2.svg')";
        t['button-wrap-max-width'] = '209px';
        t['content-padding'] = '24px 32px';
      }
      if (r > 350) t['bg-url-position'] = 'center bottom calc(100% - 40px)';
      if (r > 415) t['bg-url-position'] = 'center bottom';
      if (r > 568) {
        t['grid-template-columns'] = '1fr 292px';
        t['grid-template-rows'] = '100%';
        t['content-grid-row'] = '1';
        t['content-padding'] = '32px 24px 24px';
      }
      if (r > 783) {
        t['grid-template-columns'] = '1fr 400px';
        t['text-font-size'] = '32px';
        t['content-padding'] = '32px 24px';
        t['bg-url'] = "url('https://pos.gosuslugi.ru/bin/banner-fluid/6/banner-fluid-bg-6-2.svg')";
        t['bg-url-position'] = 'center bottom calc(100% - 25px)';
      }
      if (r > 820) {
        t['grid-template-columns'] = '1fr 420px';
        t['bg-url-position'] = 'center bottom';
      }
      if (r > 1098) {
        t['bg-url'] = "url('https://pos.gosuslugi.ru/bin/banner-fluid/6/banner-fluid-bg-6-3.svg')";
        t['grid-template-columns'] = '1fr 557px';
        t['text-font-size'] = '36px';
        t['content-padding'] = '32px 32px 32px 50px';
        t['logo-width'] = '78px';
        t['logo-wrap-top'] = '20px';
        t['logo-wrap-right'] = '17px';
        t['slogan-font-size'] = '15px';
      }
      if (r > 1422) {
        t['max-width'] = '1422px';
        t['grid-template-columns'] = '1fr 720px';
        t['content-padding'] = '32px 48px 32px 160px';
        t['background'] = 'linear-gradient(90deg, #ffffff 50%, #f8efec 50%)';
      }

      setStyles(t, el);
    };

    changePosBannerOnResize();
    window.addEventListener('resize', changePosBannerOnResize);

    window.onunload = () => {
      const el = document.documentElement;
      removeStyles(posOptionsInitialBanner17, el);
      window.removeEventListener('resize', changePosBannerOnResize);
    };

    setTimeout(() => {
      Widget('https://pos.gosuslugi.ru/form', 227531);
    }, 10000);
  }, []);

  return (
    <Block className="gosuslugi-widget">
      <div id="js-show-iframe-wrapper">
        <div className="pos-banner-fluid bf-17">
          <div className="bf-17__decor">
            <div className="bf-17__logo-wrap">
              <img
                className="bf-17__logo"
                src="https://pos.gosuslugi.ru/bin/banner-fluid/gosuslugi-logo-blue.svg"
                alt="Госуслуги"
              />
              <div className="bf-17__slogan">Решаем вместе</div>
            </div>
          </div>
          <div className="bf-17__content">
            <div className="bf-17__text">Не смогли записаться к врачу?</div>
            <div className="bf-17__bottom-wrap">
              <div className="bf-17__btn-wrap">
                <button className="pos-banner-btn_2" type="button">
                  Написать о проблеме
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Block>
  );
};
