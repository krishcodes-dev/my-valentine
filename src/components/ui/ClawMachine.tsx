"use client";

import { useEffect, useRef, useState } from 'react';

const IMG_CLAW_MACHINE_BG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMjF6u95kAAAAMElEQVRoQ+3TQQ0AIAzEwA4G/i0M/KASB/24BAxI2Czrv2W/W/W71gEAAAAAAAAAAGgS6t1C9Q+Mv8IAAAAASUVORK5CYII="; // Placeholder

interface ClawMachineProps {
  onWin?: () => void;
}

export default function ClawMachine({ onWin }: ClawMachineProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const onWinRef = useRef(onWin);

  useEffect(() => {
    onWinRef.current = onWin;
  }, [onWin]);

  useEffect(() => {
    // This component will re-implement the VANILLA JS snippet you provided literally.
    // We are wrapping it in a React component but keeping the logic exactly as provided.
    // Some adaptations are made to mount/unmount cleanly.

    const container = wrapperRef.current;
    if (!container) return;

    // --- PASTE THE SNIPPET CODE HERE (Logic adapted to standard JS) ---
    // Since the snippet relies on `document.querySelector`, we scope it to `container`.

    // 1. Create DOM Structure exactly as requested
    container.innerHTML = `
      <div class="wrapper-inner">
        <div class="collection-box pix"></div>
        <div class="claw-machine">
          <div class="box pix">
            <div class="machine-top pix">
              <div class="arm-joint pix">
                <div class="arm pix">
                  <div class="claws pix"></div>
                </div>
              </div>
              <div class="rail vert pix"></div>
              <div class="rail hori pix"></div>
            </div>
            <div class="machine-bottom pix">
              <div class="collection-point pix"></div>
            </div>
          </div>
          <div class="control pix">
            <div class="cover left"></div>
            <button class="hori-btn pix"></button>
            <button class="vert-btn pix"></button>
            <div class="cover right">
              <div class="instruction pix"></div>
            </div>
            <div class="cover bottom"></div>
            <div class="cover top">
              <div class="collection-arrow pix"></div>
            </div>
            <div class="collection-point pix"></div>
          </div>
        </div>
      </div>

    `;

    // 2. Add Styles dynamically (Since scoping CSS is tricky, we inject a style tag)
    const styleId = "claw-machine-styles";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
            /* Scoped wrapper for safety */
            /* But the provided CSS uses global selectors. We will use them as is for fidelity. */
            
            .wrapper-inner {
              display: flex;
              justify-content: center;
              align-items: center;
              /* height: 100vh; Removed to fit container */
              height: 100%;
              min-height: 600px;
              flex-direction: column;
              /* Scale down if on mobile? We'll leave as is. */
              transform-origin: top center;
            }

            /* --- USER PROVIDED CSS START --- */
            
            *,
            ::before,
            ::after {
              box-sizing: border-box;
            }

            /* Removed body styles to not break app */
            /* 
            body {
              padding: 0;
              margin: 0;
              font-family: sans-serif;
              background-color: #84dfe2;
            }
            */

             /* Define CSS Vars locally on wrapper */
            .wrapper-inner {
              --brown: #57280f;
              --blue: #33a5da;
              --dark-blue: #3a94b7;
              --machine-color: #32c2db;
              --machine-width: 160px;
              --m: 2;
              font-family: sans-serif;
            }

            .pix,
            .pix::before,
            .pix::after {
              width: calc(var(--w) * var(--m));
              height: calc(var(--h) * var(--m));
              image-rendering: pixels; /* Fix for some browsers using 'pixelated' */
              image-rendering: pixelated;
              background-size: calc(var(--w) * var(--m)) calc(var(--h) * var(--m));
            }

            .pix::before,
            .pix::after {
              position: absolute;
              content: '';
            }

            .claw-machine {
              display: flex;
              flex-direction: column;
              border: 2px solid var(--brown);
              overflow: hidden;
              background-color: var(--machine-color); /* Added bg color from body */
            }

            .collection-box {
              --h: 32px;
              width: calc(var(--m) * var(--machine-width));
              margin: calc(var(--m) * var(--h) * -1 - 10px) 0 24px;
              display: flex;
              align-items: flex-end; /* Fixed typo 'bottom' -> 'flex-end' */
              justify-content: flex-start; /* Fixed 'start' -> 'flex-start' */
            }

            .collection-box .toy-wrapper {
              position: relative;
              width: calc(100% / 6);
              display: flex;
              align-items: flex-end;
              justify-content: center;
            }

            .collection-box .toy-wrapper .toy::after {
              top: auto;
              bottom: 0;
            }

            .toy-wrapper.squeeze-in {
              width: 0;
              animation: squeeze-in forwards 0.4s;
              animation-delay: 1.4s;
            }

            @keyframes squeeze-in {
              0% {
                width: 0;
              }
              100% {
                width: calc(100% / 6);
              }
            }

            @keyframes show-toy-2 {
              0% {
                opacity: 0;
                transform: translateY(-100vh);
              }
              100% {
                opacity: 1;
                transform: translateY(0);
              }
            }

            .toy-wrapper .toy {
              opacity: 0;
              transform: translateY(-100vh);
              animation: forwards show-toy-2 0.8s;
              animation-delay: 1s;
            }

            .claw-machine.show-overlay::after {
              content: '';
              position: absolute;
              width: 100%;
              height: 100%;
              left: 0;
              top: 0;
              background-color: var(--machine-color);
              opacity: 0.6;
              z-index: 6;
              pointer-events: none;
            }

            .box {
              position: relative;
              background-color: #7fcfed;
              --w: var(--machine-width);
              --h: 180px;
            }

            .box::before {
              background-color: var(--brown);
              top: calc(70px * var(--m));
              width: 100%;
              height: calc(var(--m) * 8px);
              z-index: 5;
            }

            .box::after {
              background-color: var(--machine-color);
              top: calc(70px * var(--m));
              right: 0px;
              width: calc(var(--m) * 8px);
              height: calc(var(--m) * 170px);
              z-index: 2;
            }

            .machine-top,
            .machine-bottom {
              position: absolute;
              width: 100%;
              --h: 70px;
              height: calc(var(--h) * var(--m));
            }

            .machine-top {
              top: 0;
              display: flex;
              align-items: center;
              z-index: 1;
            }

            .machine-top::after {
              content: '';
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background-color: #70f7f372;
              z-index: 1;
            }

            .machine-bottom {
              bottom: 0;
              background-color: #def7f6;
            }

            .collection-point {
              position: absolute;
              bottom: 0;
              background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAMCAYAAABm+U3GAAAAAXNSR0IArs4c6QAAADBJREFUOE9jtJqy/T8DFcGxHE9GkHGM1DYYZCjIcJoYTDMXjxqMkrZGIw8eHEMvKADnSiE1EAXSagAAAABJRU5ErkJggg==);
              --w: 44px;
              --h: 24px;
              z-index: 0;
            }

            .rail {
              top: 0;
              left: 0;
              transition: 0.3s;
              border: solid var(--blue);
            }

            .rail.hori {
              --h: 5px;
              width: 100%;
              background-color: #fff;
              border-width: 2px 0;
              z-index: 1;
            }

            .rail.vert {
              position: absolute;
              --h: 70px;
              --w: 5px;
              background-color: #fff;
              border-width: 0 2px;
            }

            .arm-joint {
              position: absolute;
              top: 0;
              left: 0;
              --w: 5px;
              --h: 5px;
              transition: 0.3s;
              z-index: -1;
            }

            .arm-joint::after {
              position: absolute;
              border: solid var(--blue) 2px;
              background-color: #fff;
              --w: 10px;
              --h: 10px;
              top: calc(var(--m) * var(--h) * -0.25);
              left: calc(var(--m) * var(--w) * -0.25);
            }

            .arm::after {
              position: absolute;
              --w: 13px;
              --h: 7px;
              bottom: calc(var(--m) * -1px);
              left: calc(var(--m) * -3px);
              background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAHCAYAAADTcMcaAAAAAXNSR0IArs4c6QAAAElJREFUKFNjZGBgYDBeeus/iCYGnI1WY2QEaTgTpUqMerAak2W3GVA0RWgKMKy4/gHDAGRx6miCWQEyGQbQbcawiRiPgTWRE3oA5mIzfZr3jVYAAAAASUVORK5CYII=);
            }

            .arm.missed::after {
              background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAHCAYAAADTcMcaAAAAAXNSR0IArs4c6QAAAENJREFUKFNjZGBgYDBeeus/iCYGnI1WY2QEaTgTpUqMerAak2W3GSjTFKEpADZpxfUPGLYiy+G0CaYImyHkO4+c0AMAWBctfQPWfVQAAAAASUVORK5CYII=);
            }

            .control {
              position: relative;
              --h: 60px;
              width: 100%;
              text-align: right;
              background-color: var(--dark-blue);
            }

            .cover {
              position: absolute;
              background-color: var(--machine-color);
              --top-size: calc(var(--m) * 20px);
              --bottom-size: calc(var(--m) * 10px);
              z-index: 4;
            }

            .top {
              top: 0;
              width: 100%;
              height: calc(var(--m) * 16px);
            }

            .collection-arrow {
              position: absolute;
              left: calc(var(--m) * 21px);
              top: calc(var(--m) * 9px);
              --w: 8px;
              --h: 4px;
              background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAECAYAAACzzX7wAAAAAXNSR0IArs4c6QAAAClJREFUGFdjDDn86T8DHsAIksOlaI0tHyNYATZFIEmQOFwBsiKYJEgMAPTvDw1xBcM+AAAAAElFTkSuQmCC);
              filter: sepia(1) brightness(0.5);
            }

            .bottom {
              bottom: 0px;
              width: 100%;
              height: calc(var(--m) * 8px);
              background-color: var(--brown);
            }

            .left {
              bottom: 0px;
              left: 0px;
              height: calc(var(--m) * 170px);
              width: calc(var(--m) * 8px);
            }

            .right {
              top: 0;
              right: 0px;
              height: 100%;
              width: calc(var(--m) * 116px);
            }

            .instruction {
              position: absolute;
              --w: 51px;
              --h: 12px;
              background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAMCAYAAADPjYVSAAAAAXNSR0IArs4c6QAAAPRJREFUSEvdVkESwkAIs0d9hv9/k8/Qow4d6aSZBKjjRfdSdltYIBC63B735+m9rufLkvuQ4/joHnVCRjsp531hG89w7+S0r3xdnc8X1RONOGfynL/lO1A/A8akOZ/4Xk7GhoQy6pBx2fwkmKOJZMQQ/Q0ZFzVHP0VIlUlVVlw+GKR6p/wYBTNFzSGjLu6SMk3iDhl04NfllbH+ZZUEUDWbqn9XjkgkWBaqlJh0eHQopkwwLDU7eu0a1fWHs9eRQqeHNF4OSYfMNFvVkHSzZ0oMqP9VZBytcy9O6JptTZGJ72SZqdrvJjT3Au6VgxVds+70t+cFkvdjifIP/BkAAAAASUVORK5CYII=);
              top: calc(var(--m) * 34px);
              right: calc(var(--m) * 11px);
            }

            .arm {
              position: absolute;
              --w: 7px;
              --h: 28px;
              background-color: #fff;
              box-shadow: 0 0 0 2px var(--blue);
              transition: 0.3s;
              margin-top: calc(var(--m) * -1px);
              margin-left: calc(var(--m) * -1px);
            }

            .claws {
              position: absolute;
              --w: 3px;
              --h: 10px;
              bottom: calc(var(--m) * -5px);
              left: calc(var(--m) * 2.5px);
            }

            .claws::before,
            .claws::after {
              top: 0;
              --w: 10px;
              --h: 16px;
              transition: 0.2s;
            }

            .claws::before {
              left: calc(var(--m) * -10px);
              background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAQCAYAAAAvf+5AAAAAAXNSR0IArs4c6QAAAGRJREFUKFNjZMADwjX4/6+88ZERpARMYAMgRSuuf2CI0BRgACnGqhCmCGYASDGGQmyKMEzEpQjFjfgUwRUSUgRWSIwi0hSCVBNjKjx4CClGCUeiggcWC0QFOD7FlCUKZJNhyQwAi8VlK14hrsQAAAAASUVORK5CYII=);
              --close-angle: 45deg;
              transform-origin: top right;
            }

            .claws::after {
              left: calc(var(--m) * 2.5px);
              background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAQCAYAAAAvf+5AAAAAAXNSR0IArs4c6QAAAFxJREFUKFNjZICCcA3+/ytvfGSE8dFpsARI0YrrHxgiNAUYcClmhCmCmYBLMYqJ+BTD3UTIZBTH41OM4UtcirEGBzbF5CskymqiPENU8BBSBIoI8qIQb6IgNpkBAEPjZSuK8jVuAAAAAElFTkSuQmCC);
              --close-angle: -45deg;
              transform-origin: top left;
            }

            .arm.open .claws::before,
            .arm.open .claws::after {
              rotate: var(--close-angle);
            }

            .arm-joint::before {
              --w: 20px;
              --h: 16px;
              transform: scale(var(--scale));
              margin-left: -15px;
              margin-top: var(--shadow-pos);
              background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAQCAYAAAAWGF8bAAAAAXNSR0IArs4c6QAAAF5JREFUOE9jZMABXmQc+49LDiQuMcOKEZs8iiAhQ3BZgGw43EByDYNZAjMUbCClhiEbSn0DqeU6mCsZRw3El5aJkqN+GA7+dAgLGEqTD0rWo9RQrIUDehQScjGu4gsANVo6j8xbO6QAAAAASUVORK5CYII=);
              background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAQCAYAAAAWGF8bAAAAAXNSR0IArs4c6QAAAF5JREFUOE9jZMABrKZs/49LDiR+LMeTEZs8iiAhQ3BZgGw43EByDYNZAjMUbCClhiEbSn0DqeU6mCsZRw3El5aJkqN+GA7+dAgLGEqTD0rWo9RQrIUDehQScjGu4gsAxKQ3Ke4v44gAAAAASUVORK5CYII=);
              z-index: -1;
              opacity: 0.5;
            }

            button {
              position: relative;
              z-index: 5;
              --w: 24px;
              --h: 24px;
              margin: 12px 12px 0 0;
              border: 0;
              background-color: transparent;
              background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAAXNSR0IArs4c6QAAAFRJREFUKFNjZICC/////4exsdGMjIyMIHEwQUgxzACQJkZsikOPfAarWW3Di2EZhgaYYphKdE0oGtAVY9ME14BLMbomypwEMo0kP9BGA8kRR2rSAACHREftd0fKPgAAAABJRU5ErkJggg==);
              filter: sepia(1) brightness(0.4);
              pointer-events: none;
              cursor: pointer;
            }

            .hori-btn {
              transform: rotate(90deg);
            }

            .active {
              animation: pulse infinite 1s;
              pointer-events: all;
            }

            @keyframes pulse {
              0%,
              100% {
                filter: sepia(0);
              }
              50% {
                filter: sepia(1);
              }
            }

            .toy.display {
              transform: scale(3);
              animation: forwards show-toy-1 0.8s;
              animation-delay: 1s;
            }

            .toy {
              position: absolute;
              transition: transform 1s, left 0.3s, top 0.3s;
              --m: 2;
              --w: 20px;
              --h: 27px;
              transform: rotate(var(--rotate-angle));
              pointer-events: none;
            }

            .toy::after {
              content: '';
            }

            .toy.bear::after {
              --w: 24px;
              --h: 30px;
              top: calc(var(--m) * -2px);
              left: calc(var(--m) * -2px);
              background-image: url(/bear_eyesopened.png);
            }

            .toy.bear.grabbed::after {
              background-image: url(/bear_eyesclosed.png);
            }

            .toy-wrapper .toy.bear::after {
              background-image: url(/bear_eyesopened.png);
            }

            .toy.bunny {
              --w: 20px;
              --h: 29px;
            }

            .toy.bunny::after {
              --w: 24px;
              --h: 32px;
              top: calc(var(--m) * -2px);
              left: calc(var(--m) * -2px);
              background-image: url(/bear_eyesopened.png);
            }

            .toy.bunny.grabbed::after {
              background-image: url(/bear_eyesclosed.png);
            }

            .toy-wrapper .toy.bunny::after {
              background-image: url(/bear_eyesopened.png);
            }

            .toy.golem::after {
              --w: 26px;
              --h: 30px;
              top: calc(var(--m) * -1px);
              left: calc(var(--m) * -3px);
              background-image: url(/bear_eyesopened.png);
            }

            .toy.golem.grabbed::after {
              background-image: url(/bear_eyesclosed.png);
            }

            .toy-wrapper .toy.golem::after {
              background-image: url(/bear_eyesopened.png);
            }

            .toy.cucumber {
              --w: 16px;
              --h: 28px;
            }

            .toy.cucumber::after {
              --w: 16px;
              --h: 30px;
              top: calc(var(--m) * 1px);
              left: 0;
              background-image: url(/bear_eyesopened.png);
            }

            .toy.cucumber.grabbed::after {
              background-image: url(/bear_eyesclosed.png);
            }

            .toy-wrapper .toy.cucumber::after {
              background-image: url(/bear_eyesopened.png);
            }

            .toy.penguin {
              --w: 24px;
              --h: 22px;
            }

            .toy.penguin::after {
              --w: 26px;
              --h: 24px;
              top: calc(var(--m) * -1px);
              left: calc(var(--m) * -1px);
              background-image: url(/bear_eyesopened.png);
            }

            .toy.penguin.grabbed::after {
              background-image: url(/bear_eyesclosed.png);
            }

            .toy-wrapper .toy.penguin::after {
              background-image: url(/bear_eyesopened.png);
            }

            .toy.robot {
              --w: 20px;
              --h: 30px;
            }

            .toy.robot::after {
              --w: 24px;
              --h: 32px;
              top: calc(var(--m) * -1px);
              left: calc(var(--m) * -2px);
              background-image: url(/bear_eyesopened.png);
            }

            .toy.robot.grabbed::after {
              background-image: url(/bear_eyesclosed.png);
            }

            .toy-wrapper .toy.robot::after {
              background-image: url(/bear_eyesopened.png);
            }

            .toy.selected {
              pointer-events: all;
            }

            @keyframes show-toy-1 {
              0% {
                opacity: 1;
                transform: scale(3) translateY(0);
              }
              30% {
                opacity: 0;
              }
              100% {
                opacity: 0;
                transform: scale(1) translateY(-100vh);
              }
            }

            .control .collection-point {
              filter: brightness(0.8);
              bottom: calc(var(--m) * 8px);
            }

            .sign {
              position: fixed;
              color: var(--brown);
              bottom: 10px;
              right: 10px;
              font-size: 10px;
            }

            a {
              color: var(--brown);
              text-decoration: none;
            }

            a:hover {
              text-decoration: underline;
            }
            /* --- END USER CSS --- */
        `;
      document.head.appendChild(style);
    }



    // 3. Logic (adapted ES6 module)
    // We wrap it in a function to keep variables scoped
    const initGame = () => {
      // Since we are scoped to ref, we must select relative
      const q = (sel: string) => container.querySelector(sel);
      const qa = (sel: string) => container.querySelectorAll(sel);

      // --- START USER JS ---
      const elements = {
        clawMachine: q('.claw-machine'),
        box: q('.box'),
        collectionBox: q('.collection-box'),
        collectionArrow: q('.collection-arrow'),
        toys: [] as any[],
      }

      // Avoid crashes if elements missing (e.g. unmount race)
      if (!elements.clawMachine || !elements.box) return;

      const settings = {
        targetToy: null as any,
        collectedNumber: 0,
      }

      const m = 2
      const toys = {
        bear: {
          w: 20 * m,
          h: 27 * m,
        },
        bunny: {
          w: 20 * m,
          h: 29 * m,
        },
        golem: {
          w: 20 * m,
          h: 27 * m,
        },
        cucumber: {
          w: 16 * m,
          h: 28 * m,
        },
        penguin: {
          w: 24 * m,
          h: 22 * m,
        },
        robot: {
          w: 20 * m,
          h: 30 * m,
        },
      }

      const sortedToys = [...Object.keys(toys), ...Object.keys(toys)].sort(
        () => 0.5 - Math.random(),
      )

      const cornerBuffer = 16

      const machineBuffer = {
        x: 36,
        y: 16,
      }

      const radToDeg = (rad: number) => Math.round(rad * (180 / Math.PI))
      const calcX = (i: number, n: number) => i % n
      const calcY = (i: number, n: number) => Math.floor(i / n)

      const machineRect = elements.clawMachine!.getBoundingClientRect()
      // Fallback or calc
      const machineWidth = machineRect.width || 320;
      const machineHeight = machineRect.height || 480;
      const machineTop = machineRect.top;


      // Queries that might fail if render is not complete, assume standard sizes if fail
      const machineTopEl = q('.machine-top');
      const machineTopHeight = machineTopEl ? machineTopEl.getBoundingClientRect().height : 140;

      const machineBottomEl = q('.machine-bottom');
      const machineBottomRect = machineBottomEl ? machineBottomEl.getBoundingClientRect() : { height: 140, top: machineTop + 340 };
      const machineBottomHeight = machineBottomRect.height;
      const machineBottomTop = machineBottomRect.top;

      const maxArmLength = machineBottomTop - machineTop - machineBuffer.y

      const adjustAngle = (angle: number) => {
        const adjustedAngle = angle % 360
        return adjustedAngle < 0 ? adjustedAngle + 360 : adjustedAngle
      }

      const randomN = (min: number, max: number) => {
        return Math.round(min - 0.5 + Math.random() * (max - min + 1))
      }

      //* classes *//

      class Button {
        el: HTMLElement;
        isLocked: boolean;
        constructor({ className, action, isLocked, pressAction, releaseAction }: any) {
          const btn = q(`.${className}`) as HTMLElement
          this.el = btn;
          this.isLocked = isLocked;

          // Safety
          if (!this.el) return;

          this.el.addEventListener('click', action)
            ;['mousedown', 'touchstart'].forEach(action =>
              this.el.addEventListener(action, pressAction),
            )
            ;['mouseup', 'touchend'].forEach(action =>
              this.el.addEventListener(action, releaseAction),
            )

          if (!isLocked) this.activate()
        }
        activate() {
          this.isLocked = false
          this.el.classList.add('active')
        }
        deactivate() {
          this.isLocked = true
          this.el.classList.remove('active')
        }
      }

      class WorldObject {
        x: number; y: number; z: number; w: number; h: number; angle: number;
        transformOrigin: any; interval: any; default: any; moveWith: any[]; el: HTMLElement;
        clawPos: any; bottom: any;

        constructor(props: any) {
          this.x = 0;
          this.y = 0;
          this.z = 0;
          this.angle = 0;
          this.transformOrigin = { x: 0, y: 0 };
          this.interval = null;
          this.default = {};
          this.moveWith = [];
          this.el = props.className ? q(`.${props.className}`) as HTMLElement : props.el;

          this.w = 0;
          this.h = 0;

          Object.assign(this, props);

          if (!this.el && props.className) { console.warn("Missing", props.className); return; }

          this.setStyles()
          if (props.className && this.el) {
            const { width, height } = this.el.getBoundingClientRect()
            this.w = width
            this.h = height
          }
          ;['x', 'y', 'w', 'h'].forEach(key => {
            this.default[key] = (this as any)[key]
          })
        }
        setStyles() {
          if (!this.el) return;
          Object.assign(this.el.style, {
            left: `${this.x}px`,
            top: !this.bottom && `${this.y}px`,
            bottom: this.bottom,
            width: `${this.w}px`,
            height: `${this.h}px`,
            transformOrigin: this.transformOrigin,
          })
          this.el.style.zIndex = `${this.z}`;
          // TS warns on direct zIndex styling sometimes
        }
        setClawPos(clawPos: any) {
          this.clawPos = clawPos
        }
        setTransformOrigin(transformOrigin: any) {
          this.transformOrigin =
            transformOrigin === 'center'
              ? 'center'
              : `${transformOrigin.x}px ${transformOrigin.y}px`
          this.setStyles()
        }
        handleNext(next: any) {
          clearInterval(this.interval)
          if (next) next()
        }
        resumeMove({ moveKey, target, moveTime, next }: any) {
          this.interval = null
          this.move({ moveKey, target, moveTime, next })
        }
        resizeShadow() {
          (elements.box as HTMLElement)?.style.setProperty('--scale', `${0.5 + this.h / maxArmLength / 2}`)
        }
        move({ moveKey, target, moveTime, next }: any) {
          if (this.interval) {
            this.handleNext(next)
          } else {
            const moveTarget = target || this.default[moveKey]
            this.interval = setInterval(() => {
              const distance =
                Math.abs((this as any)[moveKey] - moveTarget) < 10
                  ? Math.abs((this as any)[moveKey] - moveTarget)
                  : 10
              const increment = (this as any)[moveKey] > moveTarget ? -distance : distance
              if (
                increment > 0
                  ? (this as any)[moveKey] < moveTarget
                  : (this as any)[moveKey] > moveTarget
              ) {
                (this as any)[moveKey] += increment
                this.setStyles()
                if (moveKey === 'h') this.resizeShadow()
                if (this.moveWith.length) {
                  this.moveWith.forEach(obj => {
                    if (!obj) return
                    obj[moveKey === 'h' ? 'y' : moveKey] += increment
                    obj.setStyles()
                  })
                }
              } else {
                this.handleNext(next)
              }
            }, moveTime || 100)
          }
        }
        distanceBetween(target: any) {
          return Math.round(
            Math.sqrt(
              Math.pow(this.x - target.x, 2) + Math.pow(this.y - target.y, 2),
            ),
          )
        }
      }

      class Toy extends WorldObject {
        toyType: string;
        index: number;
        constructor(props: any) {
          const toyType = sortedToys[props.index]
          // @ts-ignore
          const size = toys[toyType]
          const el = document.createElement('div');
          el.className = `toy pix ${toyType}`

          super({
            el,
            x:
              cornerBuffer +
              calcX(props.index, 4) * ((machineWidth - cornerBuffer * 3) / 4) +
              size.w / 2 +
              randomN(-6, 6),
            y:
              machineBottomTop -
              machineTop +
              cornerBuffer +
              calcY(props.index, 4) *
              ((machineBottomHeight - cornerBuffer * 2) / 3) -
              size.h / 2 +
              randomN(-2, 2),
            z: 0,
            toyType,
            ...size,
            ...props,
          })
          // @ts-ignore
          this.toyType = toyType;
          this.index = props.index;

          elements.box?.append(this.el)
          const toy = this

          this.el.addEventListener('click', () => this.collectToy(toy))
          elements.toys.push(this)
        }

        collectToy(toy: any) {
          toy.el.classList.remove('selected')
          toy.x = machineWidth / 2 - toy.w / 2
          toy.y = machineHeight / 2 - toy.h / 2
          toy.z = 7
          toy.el.style.setProperty('--rotate-angle', '0deg')
          toy.setTransformOrigin('center')
          toy.el.classList.add('display')
          elements.clawMachine?.classList.add('show-overlay')
          settings.collectedNumber++
          const wrapper = document.createElement('div')
          wrapper.className = `toy-wrapper ${settings.collectedNumber > 6 ? 'squeeze-in' : ''}`;
          wrapper.innerHTML = `<div class="toy pix ${toy.toyType}"></div>`;

          elements.collectionBox?.appendChild(wrapper)
          setTimeout(() => {
            elements.clawMachine?.classList.remove('show-overlay')
            if (!document.querySelector('.selected'))
              elements.collectionArrow?.classList.remove('active')

            // Trigger Win
            if (onWinRef.current) {
              onWinRef.current();
            }
          }, 1000)
        }

        setRotateAngle() {
          const angle =
            radToDeg(
              Math.atan2(
                this.y + this.h / 2 - this.clawPos.y,
                this.x + this.w / 2 - this.clawPos.x,
              ),
            ) - 90
          const adjustedAngle = Math.round(adjustAngle(angle))
          this.angle =
            adjustedAngle < 180 ? adjustedAngle * -1 : 360 - adjustedAngle
          this.el.style.setProperty('--rotate-angle', `${this.angle}deg`)
        }
      }

      // @ts-ignore
      elements.box?.style.setProperty('--shadow-pos', `${maxArmLength} px`)

      const armJoint = new WorldObject({
        className: 'arm-joint',
      })

      const vertRail = new WorldObject({
        className: 'rail.vert', // Fixed selector
        moveWith: [null, armJoint],
      })

      const arm = new WorldObject({
        className: 'arm',
      })

      armJoint.resizeShadow()

      armJoint.move({
        moveKey: 'y',
        target: machineTopHeight - machineBuffer.y,
        moveTime: 50,
        next: () =>
          vertRail.resumeMove({
            moveKey: 'x',
            target: machineBuffer.x,
            moveTime: 50,
            next: () => {
              Object.assign(armJoint.default, {
                y: machineTopHeight - machineBuffer.y,
                x: machineBuffer.x,
              })
              Object.assign(vertRail.default, {
                x: machineBuffer.x,
              })
              activateHoriBtn()
            },
          }),
      })

      const doOverlap = (a: any, b: any) => {
        return b.x > a.x && b.x < a.x + a.w && b.y > a.y && b.y < a.y + a.h
      }

      const getClosestToy = () => {
        const claw = {
          y: armJoint.y + maxArmLength + machineBuffer.y + 7,
          x: armJoint.x + 7,
          w: 40,
          h: 32,
        }
        const overlappedToys = elements.toys.filter(t => {
          return doOverlap(t, claw)
        })

        if (overlappedToys.length) {
          const toy = overlappedToys.sort((a, b) => b.index - a.index)[0]
          toy.setTransformOrigin({
            x: claw.x - toy.x,
            y: claw.y - toy.y,
          })
          toy.setClawPos({
            x: claw.x,
            y: claw.y,
          })
          settings.targetToy = toy
        }
      }

      new Array(12).fill('').forEach((_, i) => {
        if (i === 8) return
        new Toy({ index: i })
      })

      const stopHoriBtnAndActivateVertBtn = () => {
        armJoint.interval = null
        // @ts-ignore
        horiBtn.deactivate()
        // @ts-ignore
        vertBtn.activate()
      }

      const activateHoriBtn = () => {
        // @ts-ignore
        horiBtn.activate()
          ;[vertRail, armJoint, arm].forEach(c => (c.interval = null))
      }

      const dropToy = () => {
        arm.el.classList.add('open')
        if (settings.targetToy) {
          settings.targetToy.z = 3
          settings.targetToy.move({
            moveKey: 'y',
            target: machineHeight - settings.targetToy.h - 30, // Fall to floor
            moveTime: 50,
          })
            ;[vertRail, armJoint, arm].forEach(obj => (obj.moveWith[0] = null))
        }
        setTimeout(() => {
          arm.el.classList.remove('open')
          activateHoriBtn()
          if (settings.targetToy) {
            settings.targetToy.el.classList.add('selected')
            elements.collectionArrow?.classList.add('active')
            settings.targetToy = null
          }
        }, 700)
      }

      const grabToy = () => {
        if (settings.targetToy) {
          ;[vertRail, armJoint, arm].forEach(
            obj => (obj.moveWith[0] = settings.targetToy),
          )
          settings.targetToy.setRotateAngle()
          settings.targetToy.el.classList.add('grabbed')
        } else {
          arm.el.classList.add('missed')
        }
      }

      const horiBtn = new Button({
        className: 'hori-btn',
        isLocked: true,
        pressAction: () => {
          arm.el.classList.remove('missed')
          vertRail.move({
            moveKey: 'x',
            target: machineWidth - armJoint.w - machineBuffer.x,
            next: stopHoriBtnAndActivateVertBtn,
          })
        },
        releaseAction: () => {
          clearInterval(vertRail.interval)
          stopHoriBtnAndActivateVertBtn()
        },
      })

      const vertBtn = new Button({
        className: 'vert-btn',
        isLocked: true,
        pressAction: () => {
          if (vertBtn.isLocked) return
          armJoint.move({
            moveKey: 'y',
            target: machineBuffer.y,
          })
        },
        releaseAction: () => {
          clearInterval(armJoint.interval)
          vertBtn.deactivate()
          getClosestToy()
          setTimeout(() => {
            arm.el.classList.add('open')
            arm.move({
              moveKey: 'h',
              target: maxArmLength,
              next: () =>
                setTimeout(() => {
                  arm.el.classList.remove('open')
                  grabToy()
                  arm.resumeMove({
                    moveKey: 'h',
                    next: () => {
                      vertRail.resumeMove({
                        moveKey: 'x', // Typo fix: rail moves X horizontal back
                        next: () => {
                          armJoint.resumeMove({
                            moveKey: 'y', // UP
                            next: dropToy,
                          })
                        },
                      })
                    },
                  })
                }, 500),
            })
          }, 500)
        },
      })
    };

    // Need simpler init flow since DOM renders only after return
    // Use timeout to allow DOM paint
    setTimeout(initGame, 100);

    return () => {
      // Cleanup CSS
      const styleEl = document.getElementById(styleId);
      if (styleEl) {
        styleEl.remove();
      }
    };
  }, []);

  // Return the wrapper div that we inject the HTML into
  return (
    <div
      ref={wrapperRef}
      className="w-full h-full flex items-center justify-center scale-75 md:scale-100"
    />
  );
}
