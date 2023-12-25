import { Directive, ElementRef, OnInit } from "@angular/core";
import { MemberService } from "../services/member.service";

@Directive({
    standalone: true,
    selector: '[authDirective]',
})
export class AuthDirective implements OnInit {
    constructor(private elementRef: ElementRef,
        private memberService: MemberService) {}

    ngOnInit(): void {
        const userInfo = this.memberService.getUserInfo();
        if (userInfo.type !== "admin") {
            this.elementRef.nativeElement.style.display = "none";
        }
    }
}