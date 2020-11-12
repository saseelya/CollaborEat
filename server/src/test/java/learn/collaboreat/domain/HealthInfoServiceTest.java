package learn.collaboreat.domain;

import learn.collaboreat.data.HealthInfoJDBCTemplateRepository;
import learn.collaboreat.data.HealthInfoRepository;
import learn.collaboreat.data.RecipeJDBCTemplateRepository;
import learn.collaboreat.models.HealthInfo;
import learn.collaboreat.models.Recipe;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
public class HealthInfoServiceTest {

    @Autowired
    HealthInfoService service;

    @MockBean
    HealthInfoRepository healthInfoRepository;

    @Test
    void shouldAddValidHealthInfo() {
        HealthInfo hi = new HealthInfo();
        hi.setHealthInfoName("Vegetarian");
        HealthInfo mockOut = new HealthInfo();
        hi.setHealthInfoName("Vegetarian");
        mockOut.setHealthInfoId(3);

        when(healthInfoRepository.add(hi)).thenReturn(mockOut);
        Result<HealthInfo> actual = service.add(hi);

        assertEquals(ResultType.SUCCESS, actual.getType());
        assertEquals(mockOut, actual.getPayload());
    }

    @Test
    void shouldNotAddWithInvalidHealthInfoId() {
        HealthInfo hi = new HealthInfo();
        hi.setHealthInfoName("Vegetarian");
        hi.setHealthInfoId(50);

        Result<HealthInfo> actual = service.add(hi);
        assertEquals(ResultType.INVALID, actual.getType());
    }



}
