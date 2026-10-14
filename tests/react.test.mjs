import test from 'node:test';
import assert from 'node:assert/strict';
import { createElement as h } from 'react';
import { renderToStaticMarkup as render } from 'react-dom/server';
import { Button, Input, Select, Badge, Metric, MetricPanel, Table, TableContainer } from '../lib/react/index.js';

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
