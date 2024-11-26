'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Icons from '@/utils/icon';
import '@/assets/scss/GamePage.scss';

const GamePage = () => {
  /* ------------GameLogic------------- */
  const IMG_DigHeight = 100;
  const LvlSize = 25;
  /* ------------/GameLogic------------- */

  /* ------------useState------------- */
  const [UserClickCount, setUserClickCount] = useState<number>(0);
  const [DigHeight, setDigHeight] = useState<number>(0);
  /* ------------/useState------------- */

  /* ------------ClickCount------------- */
  const ClickCount = () => {
    if (UserClickCount < LvlSize) {
      setUserClickCount(UserClickCount + 1);
    }
  };
  /* ------------/ClickCount------------- */

  /* ------------GamePlay------------- */
  useEffect(() => {
    if (UserClickCount == 2) {
      setDigHeight(50);
    }
    if (UserClickCount == 3) {
      setDigHeight(170);
    }
    if (UserClickCount > 3) {
      setDigHeight((prev) => prev + IMG_DigHeight);
    }

    console.log('UserClickCount', UserClickCount);
  }, [UserClickCount]);
  /* ------------/GamePlay------------- */

  return (
    <div className="GamePage">
      <div className="page-wrap">
        <div className="click_count">
          {UserClickCount !== LvlSize ? (
            <p>UserClickCount: {UserClickCount}</p>
          ) : (
            <p>Lvl Done! GGs!</p>
          )}
        </div>

        <div
          className="game-body"
          onClick={() => ClickCount()}
          style={{
            transform: UserClickCount >= 4 ? `translateY(-${DigHeight - 100}px)` : 'translateY(0)',
          }}>
          <div className="bg_jade">
            <Icons name="bg_jade" className="pointer-events-none" />
          </div>

          <div
            className="user_character"
            style={{ marginTop: UserClickCount > 2 ? DigHeight - 20 : DigHeight }}>
            <Image src={'/images/user_character.png'} alt={''} width={54} height={170} />
          </div>

          <div className="big-layer-wrap">
            <Image
              className="first_dig"
              src={'/images/first_dig.png'}
              alt={''}
              width={137}
              height={1}
              style={{ opacity: UserClickCount == 1 ? '1' : '0' }}
            />
            <div className="Dig-item-wrap">
              {Array.from({ length: 30 }, (_, idx) => (
                <div
                  className={`img_crop_height relative`}
                  style={{ height: `${IMG_DigHeight}px` }}>
                  <Image
                    key={idx}
                    className="Dig"
                    src={'/images/Dig.png'}
                    alt={''}
                    width={220}
                    height={1}
                    style={{
                      opacity: UserClickCount >= 2 && idx <= UserClickCount - 2 ? '1' : '0',
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="Dig_base-item-wrap">
              {Array.from({ length: 30 }, (_, idx) => (
                <div
                  className={`img_crop_height relative`}
                  style={{ height: `${IMG_DigHeight}px` }}>
                  <Image
                    key={idx}
                    className="Dig_base"
                    src={'/images/Dig_base.png'}
                    alt={''}
                    width={220}
                    height={1}
                    style={{
                      opacity: UserClickCount >= 2 && idx == UserClickCount - 2 ? '1' : '0',
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="dig-bg-wrap">
              <div
                className="dig-gradient"
                style={{
                  opacity: UserClickCount >= 2 ? '1' : '0',
                  height: UserClickCount >= 3 ? `${DigHeight + 30}px` : '82px',
                }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
