from manim import *

class DarkThemeBanner(Scene):
    def construct(self):
        """
        """
        def get_title_VGroup(word:str):
            group = VGroup()
            for k,v in enumerate(word):
                if(k==0):
                    group.add(Text(v.upper()).scale(3).set_opacity(0))
                else:
                    group.add(Text(v).next_to(group[k-1],RIGHT).align_to(group[k-1],DOWN).set_opacity(0))
            return group

        def expand(mob:VGroup):
            mob.next_to(self.author,RIGHT*5)
            for letter in mob:
                if 3 > letter.get_center()[0]:
                    letter.set_opacity(1)

        self.author = Text("是思学呀").scale(3)
        self.title = get_title_VGroup("lua教程")
        self.title.add_updater(expand)
        self.add(self.title)
        self.play(SpiralIn(self.author))
        self.play(self.author.animate.scale(0.3))
        self.play(self.author.animate.shift(LEFT*4))
        self.wait()
