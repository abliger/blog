<template>
    <div class="card3">
        <!-- <Content path="about" /> -->
        <div class="project-before">
            <div>
                <div>新语言</div>
            </div>

            <div>
                <div>pixiv_download</div>
            </div>
        </div>
        <div class="skill">
            <div>JavaScript/TypeScript</div>
            <div>Vue</div>
            <div>C#</div>
            <div>Rust</div>
            <div>Swift</div>
            <div>Java</div>
            <div>SpringBoot</div>
            <div>Skills</div>
            <div>Data Structure/Compiling Principles</div>
            <div>three.js</div>
        </div>
        <div class="project-after">
            <div>
                <div>blog</div>
            </div>
            <div>
                <div>TaskTodo</div>
            </div>
        </div>
        <!-- <div class="other-skills">
            <div>vitepress</div>
            <div>skills-icons</div>
            <div>simple-icons</div>
        </div> -->
    </div>
</template>
<style lang="css" scoped>
    .card3 {
        width: 100%;
        height: 640px;
        display: flex;
        flex-direction: column;
    }

    .project-before,
    .skill,
    .project-after div {
        height: 200px;
        width: 100%;

    }

    .project-before,
    .project-after {
        width: 100%;
        height: 200px;
        display: flex;
        justify-content: space-around;
    }

    .project-before div {
        width: 300px;

    }

    .project-before div div {
        margin: 30px;
        width: 300px;
        line-height: 140px;
        text-align: center;
        background-color: rgb(43, 82, 82);
    }

    .project-after div {
        width: 300px;
        height: 200px;
    }

    .project-after div div {
        margin: 30px;
        width: 300px;
        height: 140px;
        line-height: 140px;
        text-align: center;
        background-color: rgb(43, 82, 82);
    }

    .skill {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        grid-row: 1fr 1fr;
        gap: 20px;
        margin: 20px 0px;

        div {
            padding: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            width: 100%;
            background-color: rgb(69, 122, 122);
            box-shadow: 2px 1px slategrey;
        }
    }
</style>
