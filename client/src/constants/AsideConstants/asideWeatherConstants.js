export const weatherIcons = {
    "Sunny": (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
            <path d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"/>
        </svg>
    ),
    "Partly Cloudy": (
         <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth={1} stroke="none" className="w-7 h-7">
            <path fill="currentColor" d="M11.5 5.423V2.038h1v3.385h-1Zm5.496 2.289l-.708-.727l2.402-2.408l.708.733l-2.402 2.402Zm1.58 4.788v-1h3.386v1h-3.385Zm.114 6.898l-2.402-2.402l.727-.727l2.408 2.396l-.733.733ZM7.023 7.731l-2.44-2.44l.732-.695l2.416 2.427l-.708.708Zm-.446 11.384h4.115q.818 0 1.409-.59q.591-.592.591-1.41q0-.817-.569-1.399t-1.386-.581h-.968l-.365-.873q-.389-.902-1.206-1.428q-.817-.526-1.813-.526q-1.385 0-2.347.961q-.961.962-.961 2.346q0 1.462 1.02 2.481q1.018 1.02 2.48 1.02Zm0 1q-1.864 0-3.182-1.318q-1.318-1.318-1.318-3.182q0-1.805 1.25-3.056q1.252-1.251 3.058-1.251q1.365 0 2.478.774q1.112.774 1.577 2.053q1.258 0 2.246.757q.987.758 1.006 2.239q-.011 1.232-.88 2.108q-.868.876-2.12.876H6.577Zm7.077-3.369q-.067-.25-.135-.484q-.067-.235-.134-.485q1.182-.494 1.899-1.504Q16 13.263 16 12q0-1.65-1.175-2.825T12 8q-1.558 0-2.702 1.042q-1.144 1.043-1.267 2.6q-.25-.067-.506-.129q-.256-.061-.506-.128q.235-1.893 1.659-3.139Q10.102 7 12 7q2.077 0 3.538 1.462Q17 9.923 17 12q0 1.598-.917 2.886t-2.43 1.86ZM12.025 12Z"></path>
        </svg>
    ),
    "Rain": (
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 32 32" strokeWidth={1} stroke="none" className="w-7 h-7">
            <path d="M23.5 22h-15A6.5 6.5 0 0 1 7.2 9.14a9 9 0 0 1 17.6 0A6.5 6.5 0 0 1 23.5 22zM16 4a7 7 0 0 0-6.94 6.14L9 11h-.86a4.5 4.5 0 0 0 .36 9h15a4.5 4.5 0 0 0 .36-9H23l-.1-.82A7 7 0 0 0 16 4zm-2 26a.93.93 0 0 1-.45-.11a1 1 0 0 1-.44-1.34l2-4a1 1 0 1 1 1.78.9l-2 4A1 1 0 0 1 14 30zm6 0a.93.93 0 0 1-.45-.11a1 1 0 0 1-.44-1.34l2-4a1 1 0 1 1 1.78.9l-2 4A1 1 0 0 1 20 30zM8 30a.93.93 0 0 1-.45-.11a1 1 0 0 1-.44-1.34l2-4a1 1 0 1 1 1.78.9l-2 4A1 1 0 0 1 8 30z"></path>
        </svg>
    ),
    "Drizzle": (
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 32 32" strokeWidth={1} stroke="none" className="w-7 h-7">
            <path d="M23.5 22h-15A6.5 6.5 0 0 1 7.2 9.14a9 9 0 0 1 17.6 0A6.5 6.5 0 0 1 23.5 22zM16 4a7 7 0 0 0-6.94 6.14L9 11h-.86a4.5 4.5 0 0 0 .36 9h15a4.5 4.5 0 0 0 .36-9H23l-.1-.82A7 7 0 0 0 16 4zm-2 26a.93.93 0 0 1-.45-.11a1 1 0 0 1-.44-1.34l2-4a1 1 0 1 1 1.78.9l-2 4A1 1 0 0 1 14 30zm6 0a.93.93 0 0 1-.45-.11a1 1 0 0 1-.44-1.34l2-4a1 1 0 1 1 1.78.9l-2 4A1 1 0 0 1 20 30zM8 30a.93.93 0 0 1-.45-.11a1 1 0 0 1-.44-1.34l2-4a1 1 0 1 1 1.78.9l-2 4A1 1 0 0 1 8 30z"></path>
        </svg>
    ),
    "Thunderstorm": (
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 32 32" strokeWidth={1} stroke="none" className="w-7 h-7">
            <path d="M23.5 22H23v-2h.5a4.5 4.5 0 0 0 .36-9H23l-.1-.82a7 7 0 0 0-13.88 0L9 11h-.86a4.5 4.5 0 0 0 .36 9H9v2h-.5A6.5 6.5 0 0 1 7.2 9.14a9 9 0 0 1 17.6 0A6.5 6.5 0 0 1 23.5 22Z"></path>
            <path d="m15.87 30.5l-1.74-1l3.15-5.5h-6l4.85-8.5l1.74 1l-3.15 5.5h6l-4.85 8.5z"></path>
        </svg>
    ),
    "Rain with Thunderstorm": (
         <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth={1} stroke="none" className="w-7 h-7">
             <path d="M24 0v24H0V0h24ZM12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036c-.01-.003-.019 0-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.016-.018Zm.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01l-.184-.092Z"></path>
             <path d="M12.496 12.632a1 1 0 0 1 .372 1.364L11.723 16h1.105a1.1 1.1 0 0 1 .955 1.646l-1.915 3.35a1 1 0 1 1-1.736-.992L11.277 18h-1.105a1.1 1.1 0 0 1-.955-1.646l1.915-3.35a1 1 0 0 1 1.364-.372ZM15 18.5a1 1 0 0 1 1.931.517l-.258.966a1 1 0 1 1-1.932-.517L15 18.5Zm-9.78 0a1 1 0 0 1 1.932.517l-.26.966a1 1 0 1 1-1.931-.517l.259-.966Zm12.04-4.571a1 1 0 0 1 .707 1.225l-.259.966a1 1 0 0 1-1.932-.518l.259-.966a1 1 0 0 1 1.225-.707Zm-9.78 0a1 1 0 0 1 .707 1.225l-.259.966a1 1 0 1 1-1.932-.518l.259-.966a1 1 0 0 1 1.225-.707ZM11.5 2a6.502 6.502 0 0 1 6.086 4.212a6.002 6.002 0 0 1 3.214 9.389a1 1 0 0 1-1.6-1.202a4.001 4.001 0 0 0-2.545-6.346a1.01 1.01 0 0 1-.81-.732A4.5 4.5 0 0 0 7.027 9a1.01 1.01 0 0 1-.76 1.09a3.002 3.002 0 0 0-1.97 4.216l.103.193a1 1 0 1 1-1.731 1.002A5 5 0 0 1 5 8.416A6.5 6.5 0 0 1 11.5 2Z"></path>
        </svg>
    ),
    "Snow": (
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth={1} stroke="none" className="w-7 h-7">
            <path d="M11 2a6 6 0 0 0-5.986 6.41a5 5 0 0 0-1.322 8.34a1 1 0 1 0 1.324-1.5a3.002 3.002 0 0 1 1.324-5.178a1 1 0 0 0 .757-1.193A4 4 0 1 1 14.92 7.2a1 1 0 0 0 .999.8H16a4 4 0 0 1 2.4 7.2a1 1 0 0 0 1.201 1.6a6 6 0 0 0-2.93-10.762A6.002 6.002 0 0 0 11 2zm3.5 15a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3zm-3.5-.5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0zm4 3a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0zm-5 1a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0z"></path>
        </svg>
    ),
    "Fog": (
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
            <path d="M9 14h6m-6 8h6m-8-4h10m-13.5-.618C2.188 16.707 1 15.388 1 13c0-4 3.333-5 5-5c0-2 0-6 6-6s6 4 6 6c1.667 0 5 1 5 5c0 2.388-1.188 3.707-2.5 4.382"></path>
        </svg>
    ),
    "Mist": (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
            <path d="M9 14h6m-6 8h6m-8-4h10m-13.5-.618C2.188 16.707 1 15.388 1 13c0-4 3.333-5 5-5c0-2 0-6 6-6s6 4 6 6c1.667 0 5 1 5 5c0 2.388-1.188 3.707-2.5 4.382"></path>
        </svg>
    ),
    "Smoke": (
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 56 56" strokeWidth={1} stroke="none" className="w-7 h-7">
            <path d="M1.246 27.309c0 4.43 3.094 8.273 8.063 9.164c-.282.82-.399 1.687-.399 2.601c0 4.782 3.563 8.602 8.906 8.602H44.7c6.07 0 10.055-4.172 10.055-9.446c0-4.382-2.976-8.132-7.195-9.187c-.47-4.711-3.914-8.555-8.414-9.54c-.657-4.03-4.126-7.054-8.274-7.054c-1.125 0-2.11.14-2.953.375c-2.086-2.625-4.805-4.5-8.695-4.5c-5.555 0-10.243 4.29-10.782 9.797c-4.265 1.078-7.195 4.805-7.195 9.188m3.516 0c0-3.07 2.32-5.602 5.156-5.954c1.406-.14 1.969-.843 1.945-2.25c-.047-3.89 3.282-7.242 7.36-7.242c2.789 0 4.945 1.453 6.375 3.75c.562.914 1.406 1.125 2.554.75a8.45 8.45 0 0 1 2.485-.398c2.203 0 4.101 1.406 4.78 3.375c-2.952.375-5.554 1.945-7.335 4.336a8.192 8.192 0 0 0-2.484-.375c-4.29 0-7.97 3.023-8.743 7.219a9.022 9.022 0 0 0-5.53 2.601c-4.22-.234-6.563-2.812-6.563-5.812M17.816 44.16c-3.375 0-5.39-2.226-5.39-5.086c0-3 2.46-5.11 5.273-5.156c1.57-.023 2.25-.492 2.367-1.922c.258-3 2.532-5.156 5.532-5.156c.867 0 1.359.117 2.273.469c1.219.492 1.969.28 2.484-.75c1.196-2.297 3.68-3.797 6.493-3.797c3.984 0 7.242 3.258 7.242 7.312c0 1.617.515 2.11 2.039 2.274c2.906.351 5.11 2.93 5.11 5.883c0 3.351-2.415 5.93-6.54 5.93Z"></path>
        </svg>
    ),
    "Freeze": (
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth={1} stroke="none" className="w-7 h-7">
            <path d="M11 2a6 6 0 0 0-5.986 6.41a5 5 0 0 0-1.322 8.34a1 1 0 1 0 1.324-1.5a3.002 3.002 0 0 1 1.324-5.178a1 1 0 0 0 .757-1.193A4 4 0 1 1 14.92 7.2a1 1 0 0 0 .999.8H16a4 4 0 0 1 2.4 7.2a1 1 0 0 0 1.201 1.6a6 6 0 0 0-2.93-10.762A6.002 6.002 0 0 0 11 2zm3.5 15a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3zm-3.5-.5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0zm4 3a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0zm-5 1a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0z"></path>
        </svg>
    ),
    "Hail": (
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 56 56" strokeWidth={1} stroke="none" className="w-7 h-7">
            <path d="M12.262 36.25h29.086c7.687 0 13.406-5.836 13.406-13.078c0-7.453-6.094-12.914-14.04-12.914c-2.929-5.79-8.366-9.516-15.14-9.516c-8.812 0-16.078 6.89-16.851 15.61c-4.243 1.218-7.477 4.921-7.477 9.867c0 5.531 4.031 10.031 11.016 10.031m-.047-3.773c-4.805 0-7.219-2.672-7.219-6.141c0-2.836 1.64-5.367 5.625-6.422c1.29-.328 1.758-.937 1.875-2.273c.54-7.641 6.281-13.149 13.078-13.149c5.274 0 9.422 2.883 11.953 8.086c.54 1.125 1.242 1.524 2.625 1.524c6.938 0 10.852 4.195 10.852 9.187c0 5.11-4.078 9.188-9.422 9.188Zm2.836 12.21l1.57-2.789c.399-.68.211-1.523-.492-1.945c-.727-.398-1.547-.14-1.945.54l-1.594 2.812c-.375.68-.211 1.5.515 1.922c.704.375 1.547.14 1.946-.54m10.219 3.586l3.656-6.328c.398-.726.187-1.547-.492-1.968c-.727-.399-1.547-.164-1.946.539l-3.68 6.398c-.398.656-.187 1.477.54 1.898c.68.399 1.523.141 1.922-.539m14.343-3.492l1.57-2.789c.399-.68.212-1.523-.492-1.945c-.726-.399-1.547-.164-1.945.539l-1.594 2.812c-.375.68-.21 1.5.516 1.922c.703.375 1.547.14 1.945-.539m-28.71 6.867c1.382 0 2.53-1.148 2.53-2.554c0-1.36-1.148-2.532-2.53-2.532c-1.407 0-2.555 1.172-2.555 2.532a2.56 2.56 0 0 0 2.554 2.554m24.562.094c1.36 0 2.531-1.148 2.531-2.554c0-1.36-1.148-2.532-2.531-2.532c-1.406 0-2.555 1.172-2.555 2.532a2.56 2.56 0 0 0 2.555 2.554M21.12 55.258c1.383 0 2.531-1.172 2.531-2.578c0-1.36-1.148-2.532-2.53-2.532c-1.384 0-2.556 1.172-2.556 2.532c0 1.406 1.172 2.578 2.555 2.578"></path>
        </svg>
    ),
    "Blizzard": (
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth={1} stroke="none" className="w-7 h-7">
            <path d="M11 2a6 6 0 0 0-5.986 6.41a5 5 0 0 0-1.322 8.34a1 1 0 1 0 1.324-1.5a3.002 3.002 0 0 1 1.324-5.178a1 1 0 0 0 .757-1.193A4 4 0 1 1 14.92 7.2a1 1 0 0 0 .999.8H16a4 4 0 0 1 2.4 7.2a1 1 0 0 0 1.201 1.6a6 6 0 0 0-2.93-10.762A6.002 6.002 0 0 0 11 2zm3.5 15a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3zm-3.5-.5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0zm4 3a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0zm-5 1a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0z"></path>
        </svg>
    ),
    "Tornado": (
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" strokeWidth={1} stroke="none" className="w-7 h-7">
            <path d="M1.125 2.45A.892.892 0 0 1 1 2c0-.26.116-.474.258-.634a1.9 1.9 0 0 1 .513-.389c.387-.21.913-.385 1.52-.525C4.514.17 6.18 0 8 0c1.821 0 3.486.17 4.709.452c.607.14 1.133.314 1.52.525c.193.106.374.233.513.389c.141.16.258.374.258.634c0 1.011-.35 1.612-.634 2.102c-.04.07-.08.137-.116.203a2.55 2.55 0 0 0-.313.809a2.938 2.938 0 0 0-.011.891a.5.5 0 0 1 .428.849c-.06.06-.133.126-.215.195c.204 1.116.088 1.99-.3 2.711c-.453.84-1.231 1.383-2.02 1.856c-.204.123-.412.243-.62.364c-1.444.832-2.928 1.689-3.735 3.706a.5.5 0 0 1-.748.226l-.001-.001l-.002-.001l-.004-.003l-.01-.008a2.142 2.142 0 0 1-.147-.115a4.095 4.095 0 0 1-1.179-1.656a3.786 3.786 0 0 1-.247-1.296A.498.498 0 0 1 5 12.5v-.018a.62.62 0 0 1 .008-.079a.728.728 0 0 1 .188-.386c.09-.489.272-1.014.573-1.574a.5.5 0 0 1 .073-.918a3.29 3.29 0 0 1 .617-.144l.15-.193c.285-.356.404-.639.437-.861a.948.948 0 0 0-.122-.619c-.249-.455-.815-.903-1.613-1.43c-.193-.127-.398-.258-.609-.394l-.119-.076a12.307 12.307 0 0 1-1.241-.334a.5.5 0 0 1-.285-.707l-.23-.18C2.117 4.01 1.463 3.32 1.125 2.45zm1.973 1.051c.113.104.233.207.358.308c.472.381.99.722 1.515 1.06c1.54.317 3.632.5 5.43.14a.5.5 0 0 1 .197.981c-1.216.244-2.537.26-3.759.157c.399.326.744.682.963 1.081c.203.373.302.79.233 1.247c-.05.33-.182.657-.39.985c.075.017.148.035.22.053l.006.002c.481.12.863.213 1.47.01a.5.5 0 1 1 .317.95c-.888.295-1.505.141-2.023.012l-.006-.002a3.894 3.894 0 0 0-.644-.123c-.37.55-.598 1.05-.726 1.497c.142.045.296.11.465.194a.5.5 0 1 1-.448.894a3.11 3.11 0 0 0-.148-.07c.012.345.084.643.18.895c.14.369.342.666.528.886c.992-1.903 2.583-2.814 3.885-3.56c.203-.116.399-.228.584-.34c.775-.464 1.34-.89 1.653-1.472c.212-.393.33-.9.26-1.617A6.74 6.74 0 0 1 10 8.5a.5.5 0 0 1 0-1a5.76 5.76 0 0 0 3.017-.872a.515.515 0 0 1-.007-.03c-.135-.673-.14-1.207-.056-1.665c.084-.46.253-.81.421-1.113l.131-.23c.065-.112.126-.22.182-.327c-.29.107-.62.202-.98.285C11.487 3.83 9.822 4 8 4c-1.821 0-3.486-.17-4.709-.452c-.065-.015-.13-.03-.193-.047zM13.964 2a1.12 1.12 0 0 0-.214-.145c-.272-.148-.697-.297-1.266-.428C11.354 1.166 9.769 1 8 1c-1.769 0-3.354.166-4.484.427c-.569.13-.994.28-1.266.428A1.12 1.12 0 0 0 2.036 2c.04.038.109.087.214.145c.272.148.697.297 1.266.428C4.646 2.834 6.231 3 8 3c1.769 0 3.354-.166 4.484-.427c.569-.13.994-.28 1.266-.428A1.12 1.12 0 0 0 13.964 2z"></path>
        </svg>
    ),
    "Dust": (
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth={1} stroke="none" className="w-7 h-7">
            <path d="M3 5c0-.6.4-1 1-1h1c.6 0 1 .4 1 1s-.4 1-1 1H4c-.6 0-1-.4-1-1m1 8c0-.6.4-1 1-1h1c.6 0 1 .4 1 1s-.4 1-1 1H5c-.6 0-1-.4-1-1m0 3c-.6 0-1 .4-1 1s.4 1 1 1h5c.6 0 1-.4 1-1s-.4-1-1-1H4M18 5c0-.6.4-1 1-1h2c.6 0 1 .4 1 1s-.4 1-1 1h-2c-.6 0-1-.4-1-1M7 20c-.6 0-1 .4-1 1s.4 1 1 1h4c.6 0 1-.4 1-1s-.4-1-1-1H7M3 10c-.6 0-1-.4-1-1s.4-1 1-1h9c1.1 0 2-.9 2-2s-.9-2-2-2c-.6 0-1.1.2-1.4.6c-.4.4-1 .4-1.4 0c-.4-.4-.4-1 0-1.4C9.9 2.5 10.9 2 12 2c2.2 0 4 1.8 4 4s-1.8 4-4 4H3m16 2c.6 0 1-.4 1-1s-.4-1-1-1c-.3 0-.5.1-.7.3c-.4.4-1 .4-1.4 0c-.4-.4-.4-1 0-1.4c.5-.6 1.3-.9 2.1-.9c1.7 0 3 1.3 3 3s-1.3 3-3 3h-9c-.6 0-1-.4-1-1s.4-1 1-1h9m-1 6h-5c-.6 0-1-.4-1-1s.4-1 1-1h5c1.7 0 3 1.3 3 3s-1.3 3-3 3c-.8 0-1.6-.3-2.1-.9c-.4-.4-.4-1 0-1.4c.4-.4 1-.4 1.4 0c.2.2.4.3.7.3c.6 0 1-.4 1-1s-.4-1-1-1Z"></path>
        </svg>
    ),
    "Code not recognized": (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
             stroke="currentColor" className="w-7 h-7">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"/>
        </svg>
    )
};
