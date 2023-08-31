import { createSignal, createEffect } from 'solid-js';
import './testComponentStyle.css';
import TestChild from './testChild';
import { SelectedBinderProvider } from '../../context/SelectedBinderContext';

export default function TestComponent() {
  return (
    <SelectedBinderProvider selectedBinderState={0}>
      <div class="testComponent" onclick={() => {}}>
        <TestChild />
      </div>
    </SelectedBinderProvider>
  );
}
