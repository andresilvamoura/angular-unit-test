import { TestBed } from '@angular/core/testing';
import { CoursesService } from './courses.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { COURSES, findLessonsForCourse } from '../../../../server/db-data';
import { Course } from '../model/course';
import { HttpErrorResponse } from '@angular/common/http';

describe('CoursesService', () => {
    //  variáveis do serviço e dependentes 
    let coursesService: CoursesService,
        httpTestingController: HttpTestingController;

    // Antes de cada It
    beforeEach(() => {
        // TestBet Configura e inicializa o ambiente para teste de unidade
        // e fornece métodos para criação de componentes e serviços em testes de unidade.
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                CoursesService
            ]
        });
        // Usar o TestBed para injetar os serviços e depedentes nas variáveis criadas
        coursesService = TestBed.inject(CoursesService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    it('Should retreive all courses', () => {
        coursesService.findAllCourses()
            .subscribe(courses => {
                expect(courses).toBeTruthy('No courses returned');

                expect(courses.length).toBe(12,
                    'Incorrect number of courses');

                const course = courses.find(course => course.id === 1);

                expect(course.titles.description).toBe(
                    'Serverless Angular with Firebase Course');
            });

        const req = httpTestingController.expectOne('/api/courses');
        expect(req.request.method).toEqual('GET');
        req.flush({ payload: Object.values(COURSES) });
    });

    it('Should find a course by id', () => {
        coursesService.findCourseById(12)
            .subscribe(course => {
                expect(course).toBeTruthy();
                expect(course.id).toBe(12);
            });

        const req = httpTestingController.expectOne('/api/courses/12');
        expect(req.request.method).toEqual('GET');
        //  A função flush() nos permite realizar diversas configurações de mock.
        //  Aqui nós dizemos qual será o retorno da requisição. 
        req.flush(COURSES[12]);
    });

    it('should save the course data', () => {
        const changes: Partial<Course> = { titles: { description: 'Testing course' } }; // segundo parametro esperado no saveCourse()

        coursesService.saveCourse(12, changes).subscribe(course => {
            expect(course.id).toBe(12);
        });

        const req = httpTestingController.expectOne('/api/courses/12');

        expect(req.request.method).toEqual('PUT');

        expect(req.request.body.titles.description).toEqual(changes.titles.description);

        req.flush({
            ...COURSES[12],
            ...changes
        });
    });

    it('Should give an error if save course fails', () => {
        const changes: Partial<Course> = { titles: { description: 'Testing course' } };

        coursesService.saveCourse(12, changes)
            .subscribe(
                () => fail('The save course operation should have failed'),
                (error: HttpErrorResponse) => {
                    expect(error.status).toBe(500);
                });

        const req = httpTestingController.expectOne('/api/courses/12');
        expect(req.request.method).toEqual('PUT');
        req.flush('Save course failed',
            {
                status: 500,
                statusText: 'Internal server error'
            });
    });

    it('should find a list of lessosns', () => {
        coursesService.findLessons(12)
            .subscribe(lessons => {
                expect(lessons).toBeTruthy();

                expect(lessons.length).toBe(3);
            });

        // tslint:disable-next-line: no-shadowed-variable
        const req = httpTestingController.expectOne(req => req.url == '/api/lessons');

        // Expects
        expect(req.request.method).toBe('GET');
        expect(req.request.params.get('courseId')).toEqual('12');
        expect(req.request.params.get('filter')).toEqual('');
        expect(req.request.params.get('sortOrder')).toEqual('asc');
        expect(req.request.params.get('pageNumber')).toEqual('0');
        expect(req.request.params.get('pageSize')).toEqual('3');

        req.flush({
            payload: findLessonsForCourse(12).slice(0, 3)
        });
    });

    afterEach(() => {
        // Verifica se não há solicitações sem correspondência pendentes
        httpTestingController.verify();
    });
});