import { By } from '@angular/platform-browser';
import { ComponentFixture } from '@angular/core/testing';
import { HeaderComponent } from '../components/header/header.component';

export class HeaderPageObject {
    fixture: ComponentFixture<HeaderComponent>;

    constructor(fixture: ComponentFixture<HeaderComponent>) {
        this.fixture = fixture;
    }

    isLogoutButtonVisible(): boolean {
        return !!this.fixture.debugElement.query(By.css('.logout'));
    }

    clickLogoutButton(): void {
        this.fixture.debugElement.query(By.css('.logout')).nativeElement.click();
    }
}