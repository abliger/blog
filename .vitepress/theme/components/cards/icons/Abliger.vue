<template>
    <svg
        width="363"
        height="174"
        viewBox="0 0 363 174"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            id="path1"
            fill="none"
            stroke="#000000"
            stroke-width="3"
            d="M 42 115 L 57.534481 82 L 76.724136 49 L 91.344826 27 L 93.172417 25 L 95 26 L 92.258621 41 L 89.517242 58 L 86.775864 75 L 85.862068 93 L 85.862068 103"
        />
        <path
            id="path2"
            fill="none"
            stroke="#000000"
            stroke-width="3"
            d="M 17 98 L 40 89 L 58 83 L 71 80 L 83 76 L 91 74 L 98 74 L 104 68 L 110 61 L 115 52 L 119 45 L 122 37 L 124 32 L 124 28 L 123 26 L 119 29 L 116 32 L 113 38 L 109 44 L 105 53 L 102 59 L 99 68 L 97 76 L 95 85 L 93 91 L 92 97 L 92 101 L 94 102 L 97 102 L 103 97 L 109 91 L 114 85 L 117 81 L 118 79 L 118 77 L 116 76 L 115 75 L 113 75 L 109 75 L 105 78 L 102 80 L 99 83 L 96 85 L 94 88 L 92 95 L 92 99 L 93 102 L 95 103 L 100 100 L 119 80 L 130 69 L 138 60 L 142 53 L 146 44 L 148 39 L 148 35 L 146 35 L 141 40 L 134 51 L 129 61 L 125 72 L 122 79 L 122 87 L 122 95 L 123 98 L 126 98 L 128 96 L 138 85 L 146 71 L 147 69 L 141 81 L 140 87 L 140 91 L 141 94 L 144 94 L 147 91 L 152 86 L 156 84 L 156 88 L 157 90 L 159 90 L 161 89 L 165 87 L 169 84 L 171 82 L 175 77 L 177 75 L 177 72 L 175 70 L 172 69 L 169 70 L 165 72 L 162 75 L 160 78 L 158 80 L 156 84 L 155 88 L 156 89 L 159 90 L 161 90 L 169 84 L 174 80 L 176 77 L 172 87 L 169 97 L 167 103 L 159 122 L 155 130 L 151 135 L 146 140 L 140 143 L 133 144 L 126 144 L 122 141 L 119 137 L 119 133 L 119 129 L 124 123 L 141 109 L 168 95 L 171 91 L 173 83 L 175 81 L 181 82 L 187 81 L 193 79 L 198 75 L 201 70 L 202 67 L 199 65 L 197 65 L 193 68 L 189 71 L 186 76 L 183 80 L 182 85 L 183 89 C 183 89 185.075195 91.06543 185 91 C 184.924805 90.93457 189 91 189 91 L 194 90 L 198 89 L 201 86 L 203 84 L 208 80 L 210 76 L 216 62 L 207 82 L 207 86 L 207 90 L 207 92 L 210 83 L 215 78 L 223 70 L 233 64 L 237 64 L 239 65 L 239 68 L 235 74 L 230 79 L 228 84 L 229 87 L 231 88 L 235 90 L 240 91 L 276 93 L 300 96 L 315 100 L 320 104 L 313 108 L 301 112 L 293 115 L 288 117 L 284 119"
        />
        <path
            id="path3"
            fill="none"
            stroke="#000000"
            stroke-width="3"
            d="M 59 127 L 72 122 L 91 117 L 110 114 L 125 111 L 151 108 L 182 105 L 220 104 L 234 104"
        />
        <path
            id="path4"
            fill="none"
            stroke="#000000"
            stroke-width="3"
            d="M 153.5 55 L 153 55.333336 L 153 56 L 154 55.333336 L 153.5 55 Z"
        />
    </svg>
</template>
<style lang="css" scoped>
    #path1 {
        /* stroke: #fc0; */
        stroke-dasharray: 320;
        animation: move1 1.4s linear forwards;
        stroke-dashoffset: 320;
    }
    @keyframes move1 {
        0% {
            stroke-dashoffset: 320;
        }
        100% {
            stroke-dashoffset: 0;
        }
    }
    #path2 {
        /* stroke: #fc0; */
        stroke-dasharray: 1200;
        animation: move2 3.4s ease forwards;
        animation-delay: 1.2s;
        stroke-dashoffset: 1200;
    }
    @keyframes move2 {
        0% {
            stroke-dashoffset: 1200;
        }
        100% {
            stroke-dashoffset: 0;
        }
    }
    #path3 {
        stroke-dasharray: 220;
        animation: move3 0.5s ease-out forwards;
        animation-delay: 4.5s;
        stroke-dashoffset: 220;
    }
    @keyframes move3 {
        0% {
            stroke-dashoffset: 220;
        }
        100% {
            stroke-dashoffset: 0;
        }
    }
    #path4 {
        stroke-dasharray: 12;
        animation: move4 0.1s ease forwards;
        animation-delay: 5.5s;
        stroke-dashoffset: 12;
    }
    @keyframes move4 {
        0% {
            stroke-dashoffset: 12;
        }
        100% {
            stroke-dashoffset: 0;
        }
    }
</style>
