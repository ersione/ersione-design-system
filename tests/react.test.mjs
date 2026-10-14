import test from 'node:test';
import assert from 'node:assert/strict';
import { createElement as h } from 'react';
import { renderToStaticMarkup as render } from 'react-dom/server';
import { Navigation, NavigationLink, DataHighlight, HighlightPanel, Button, Input, Select, Badge, Metric, MetricPanel, Table, TableContainer, Checkbox, Radio, Switch, Textarea, Alert, Card, Progress, Skeleton, Accordion, Pagination, Tabs, Toast } from '../lib/react/index.js';

test('buttons avoid accidental form submission and block submissions while loading', () => {
  assert.match(render(h(Button, null, 'Save')), /type="button"/);
  const busy = render(h(Button, { type: 'submit', loading: true, 'aria-label': 'Save settings' }, 'Saving'));
  assert.match(busy, /disabled=""/);
  assert.match(busy, /aria-busy="true"/);
  assert.match(busy, /type="submit"/);
  assert.match(busy, /aria-label="Save settings"/);
});

test('native form controls preserve names, default values and error relationships in SSR', () => {
  const input = render(h(Input, { name: 'query', defaultValue: '서울', required: true, 'aria-invalid': true, 'aria-describedby': 'query-error' }));
  assert.match(input, /name="query"/);
  assert.match(input, /value="서울"/);
  assert.match(input, /required=""/);
  assert.match(input, /aria-invalid="true"/);
  assert.match(input, /aria-describedby="query-error"/);
  const select = render(h(Select, { name: 'region', defaultValue: 'seoul' }, h('option', { value: 'seoul' }, '서울'), h('option', { value: 'busan', disabled: true }, '부산')));
  assert.match(select, /<option value="seoul" selected="">서울/);
  assert.match(select, /value="busan" disabled=""/);
});

test('metrics retain zero values, units and arbitrary supporting content', () => {
  const html = render(h(MetricPanel, { 'aria-label': 'Summary' }, h(Metric, { label: 'Change', value: 0, unit: '명', tone: 'flow', description: '전월 대비' }, h('a', { href: '/history' }, '이력'))));
  assert.match(html, /0<small>명<\/small>/);
  assert.match(html, /eds-data--flow/);
  assert.match(html, /전월 대비/);
  assert.match(html, /href="\/history"/);
});

test('tables retain native captions and header scope; badges do not invent live regions', () => {
  const html = render(h(TableContainer, { role: 'region', 'aria-label': 'Company data', tabIndex: 0 }, h(Table, null, h('caption', null, 'Companies'), h('thead', null, h('tr', null, h('th', { scope: 'col' }, 'Name'))), h('tbody', null, h('tr', null, h('td', null, 'Example'))))));
  assert.match(html, /<table/);
  assert.match(html, /<caption>Companies<\/caption>/);
  assert.match(html, /scope="col"/);
  const badge = render(h(Badge, { tone: 'warning' }, 'Old data'));
  assert.match(badge, /eds-status--warning/);
  assert.doesNotMatch(badge, /role="(?:alert|status)"/);
});


test('additional primitives preserve native semantics, status roles and page boundaries', () => {
  assert.match(render(h(Checkbox, { defaultChecked: true, name: 'notifications' })), /type="checkbox"/);
  assert.match(render(h(Radio, { name: 'visibility', value: 'private' })), /type="radio"/);
  assert.match(render(h(Switch, { defaultChecked: true, 'aria-label': 'Auto update' })), /role="switch"/);
  assert.match(render(h(Textarea, { name: 'description', defaultValue: 'Details' })), />Details<\/textarea>/);
  assert.match(render(h(Alert, { tone: 'error', role: 'alert', heading: 'Error' }, 'Try again')), /role="alert"/);
  assert.match(render(h(Card, { padding: 'sm' }, 'Content')), /eds-card--sm/);
  assert.doesNotMatch(render(h(Progress, { label: 'Loading' })), /value="/);
  assert.match(render(h(Skeleton, { 'aria-hidden': false })), /aria-hidden="true"/);
  assert.match(render(h(Accordion, { heading: 'More', open: true }, 'Details')), /<details[^>]*open=""/);
  const first = render(h(Pagination, { page: 1, totalPages: 3, onPageChange: () => {} }));
  assert.match(first, /disabled=""[^>]*>이전/);
  const last = render(h(Pagination, { page: 3, totalPages: 3, onPageChange: () => {} }));
  assert.match(last, /disabled=""[^>]*>다음/);
});

test('interactive entry server rendering exposes linked tabs and a persistent polite region', () => {
  const tabs = render(h(Tabs, { label: 'Project', items: [{value:'one',label:'One',content:'Overview'},{value:'two',label:'Two',content:'Settings',disabled:true}] }));
  assert.match(tabs, /role="tablist"/);
  assert.match(tabs, /aria-controls="[^"]+"/);
  assert.match(tabs, /role="tabpanel"/);
  assert.match(tabs, /aria-selected="true"/);
  const toast = render(h(Toast, { open: false }, 'Saved'));
  assert.match(toast, /role="status"/);
  assert.match(toast, /aria-live="polite"/);
  assert.doesNotMatch(toast, /Saved/);
});


test('shared navigation preserves router adapters, active state and ordinary anchor semantics', () => {
  const Adapter = props => h('a', {...props, 'data-router': 'host'});
  const html = render(h(Navigation, {size:'sm'}, h(NavigationLink, {as:Adapter, href:'/overview',active:true,icon:h('svg')}, 'Overview'), h(NavigationLink,{href:'/history'},'History')));
  assert.match(html, /eds-navigation--sm/);
  assert.match(html, /aria-current="page"/);
  assert.match(html, /data-router="host"/);
  assert.match(html, /aria-hidden="true"/);
  assert.equal((html.match(/aria-current=/g)||[]).length,1);
  assert.doesNotMatch(html,/role="tab/);
});
test('highlights preserve signed/zero/missing values without assigning success or error status', () => {
  const html=render(h(HighlightPanel,null,h(DataHighlight,{tone:'blue',size:'lg',unit:'명',secondary:'+31.7%'},0),h(DataHighlight,{tone:'teal'},'-0.6%'),h(DataHighlight,{muted:true},'비교 자료 없음')));
  assert.match(html,/0<small/); assert.match(html,/-0.6%/); assert.match(html,/eds-highlight__secondary/); assert.match(html,/eds-highlight--muted/);
  assert.doesNotMatch(html,/role="alert"|eds-status--error/);
});
