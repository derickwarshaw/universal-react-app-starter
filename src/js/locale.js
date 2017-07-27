import LocalizedStrings from 'react-localization';

let Locale = new LocalizedStrings({
  en: {
    head: {
      title: 'Next Media Accelerator',
      description: 'Next Media Accelerator',
    },
    nav: {
      links: [
        {
          name: 'Our Program',
          url: '/our-program'
        },
        {
          name: 'Portfolio',
          url: '/portfolio'
        },
        {
          name: 'Events',
          links: [
            {
              name: 'Hackathons',
              url: '/hackathons'
            },
            {
              name: 'Media Match',
              url: '/media-match'
            },
            {
              name: 'Demo Day',
              url: '/demo-day'
            },
            {
              name: 'Where to find us',
              url: '/where-to-find-us'
            }
          ]
        },
        {
          name: 'About Us',
          links: [
            {
              name: 'About',
              url: '/about'
            },
            {
              name: 'Mentors',
              url: '/mentors'
            },
            {
              name: 'FAQ',
              url: '/faq'
            }
          ]
        },
        {
          name: 'Blog',
          url: '/blog'
        },
        {
          name: 'Contact',
          url: '/contact'
        }
      ],
      apply_now: 'Apply now'
    },
    home: {
      hero: {
        title: 'We are the premier hub for media innovation in Europe'
      }
    }
  },
  //de: {}
});

Locale.setLanguage('en');

export default Locale;
