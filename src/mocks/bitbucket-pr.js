{ merge_commit: null,
  description: 'This is a test for Bitbucket integration.',
  links:
   { decline:
      { href: 'https://api.bitbucket.org/2.0/repositories/goloinc/ordering-web-app/pullrequests/9/decline' },
     commits:
      { href: 'https://api.bitbucket.org/2.0/repositories/goloinc/ordering-web-app/pullrequests/9/commits' },
     self:
      { href: 'https://api.bitbucket.org/2.0/repositories/goloinc/ordering-web-app/pullrequests/9' },
     comments:
      { href: 'https://api.bitbucket.org/2.0/repositories/goloinc/ordering-web-app/pullrequests/9/comments' },
     merge:
      { href: 'https://api.bitbucket.org/2.0/repositories/goloinc/ordering-web-app/pullrequests/9/merge' },
     html:
      { href: 'https://bitbucket.org/goloinc/ordering-web-app/pull-requests/9' },
     activity:
      { href: 'https://api.bitbucket.org/2.0/repositories/goloinc/ordering-web-app/pullrequests/9/activity' },
     diff:
      { href: 'https://api.bitbucket.org/2.0/repositories/goloinc/ordering-web-app/pullrequests/9/diff' },
     approve:
      { href: 'https://api.bitbucket.org/2.0/repositories/goloinc/ordering-web-app/pullrequests/9/approve' },
     statuses:
      { href: 'https://api.bitbucket.org/2.0/repositories/goloinc/ordering-web-app/pullrequests/9/statuses' } },
  title: '[TEST] Do not review',
  close_source_branch: true,
  reviewers:
   [ { username: 'weitogo_golo',
       display_name: 'wei.gao',
       account_id: '557058:2deab610-e609-42e0-9577-a93d99a11885',
       links: [Object],
       type: 'user',
       uuid: '{0061db35-de03-4a69-9bdb-e6e332f672a5}' },
     { username: 'jfg-golo',
       display_name: 'Jean-Francois Gagnon',
       account_id: '557058:209dd044-da36-478e-bcf4-1381853d38a8',
       links: [Object],
       type: 'user',
       uuid: '{6bb26fc3-13e7-49c0-b48a-d660d0eacef5}' } ],
  destination:
   { commit: { hash: 'f956b2dc7905', links: [Object] },
     repository:
      { links: [Object],
        type: 'repository',
        name: 'ordering-web-app',
        full_name: 'goloinc/ordering-web-app',
        uuid: '{01bc6d1c-24da-4644-a9be-14e3ccf8e6d3}' },
     branch: { name: 'develop' } },
  state: 'OPEN',
  closed_by: null,
  summary:
   { raw: 'This is a test for Bitbucket integration.',
     markup: 'markdown',
     html: '<p>This is a test for Bitbucket integration.</p>',
     type: 'rendered' },
  source:
   { commit: { hash: '94faa4465864', links: [Object] },
     repository:
      { links: [Object],
        type: 'repository',
        name: 'ordering-web-app',
        full_name: 'goloinc/ordering-web-app',
        uuid: '{01bc6d1c-24da-4644-a9be-14e3ccf8e6d3}' },
     branch: { name: 'ta/api-test' } },
  comment_count: 0,
  author:
   { username: 'thomas-golo',
     display_name: 'Thomas Andreo',
     account_id: '557058:69ec6e70-2146-4f2a-acab-d5e7591215f2',
     links: { self: [Object], html: [Object], avatar: [Object] },
     type: 'user',
     uuid: '{788d7f70-bd23-4c67-ac1a-251022bd1db9}' },
  created_on: '2018-06-26T20:15:10.748025+00:00',
  participants:
   [ { role: 'REVIEWER',
       participated_on: null,
       type: 'participant',
       approved: false,
       user: [Object] },
     { role: 'REVIEWER',
       participated_on: null,
       type: 'participant',
       approved: false,
       user: [Object] } ],
  reason: '',
  updated_on: '2018-06-26T20:17:15.138394+00:00',
  type: 'pullrequest',
  id: 9,
  task_count: 0 }
